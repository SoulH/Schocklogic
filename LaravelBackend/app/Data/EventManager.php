<?php

namespace App\Data;

use DateTime;
use Carbon\Carbon;
use \App\Models\Event;
use \App\Data\Manager;


class EventManager extends Manager {

    public function query() {
        return Event::query();
    }

    public function merge($data) {
        $event = null;
        if (array_key_exists('id', $data)) 
            $event = $this->query()->find($data['id']);
        if (empty($event)) $event = new Event();
        $event->fill($data);
        $event->save();
        $event_id = $event->id;
        if (array_key_exists('files', $data)) {
            $files = collect($data['files'])->map(function($item, $key) use($event_id) {
                $new = preg_match('/:(.+);/', $item);
                if (!$new) {
                    $exp = explode('/', $item);
                    return ['id' => end($exp)];
                } $path = 'app/events';
                $mime = preg_split('/[:;]/', $item)[1];
                $exp = explode('/', $mime);
                [$idx, $ext] = [$key + 1, end($exp)];
                $name = "event$event_id.$idx.$ext";
                return ['name' => $name, 'path' => $path, 'mime' => $mime, 'data' => $item];                   
            })->all();
            $this->uow->event_files->upsert($event_id, $files);
        }
        $attr = ['files' => function ($query) {
            $query->orderBy('order', 'asc');
        }];
        return $event->load($attr);
    }

    public function delete($event_id) {
        $e = $this->query()->find($event_id);
        if (empty($e)) return 'event not found';
        $q = $this->uow->event_files->query()->where('event_id', $event_id);
        $fids = $q->get('file_id')->map(fn($x) => $x->file_id)->all();
        $q->delete();
        $this->uow->files->query()->whereIn('id', $fids)->delete();
        $e->delete();
        return null;
    }

    public function list(int $person_id=null) {
        $attr = ['files' => function ($query) {
            $query->orderBy('order', 'asc');
        }];
        if (empty($person_id))
            return $this->query()->get()->load($attr);
        $q = $this->uow->event_participants->query()->where('person_id', $person_id);
        $li = collect($q->get('event_id')->all())->map(fn($e) => $e->event_id)->all();
        return $this->query()->whereIn('id', $li)->get()->load($attr);
    }

    public function getParticipants(int $event_id) {
        $q = $this->uow->event_participants->query()->where('event_id', $event_id);
        return $q->get(['person_id', 'created_at', 'revoked'])->load('participant')->map(function($ep) {
            $p = $ep->participant->toArray();
            $p['created_at'] = $ep->created_at;
            $p['revoked'] = $ep->revoked;
            return $p;
        })->all(); 
    }

    /**
     * Revoke the participation of a list of person_id in a specific event
     * 
     * returns a list of person_id revoked
     * 
     * @param int $event_id
     * @param Array $participants 
     * @return Array 
     */
    public function revokeParticipants(int $event_id, Array $participants) {
        $e = $this->query()->find($event_id);
        if (empty($e)) return [null, 'event not found'];
        $q = $this->uow->event_participants->query()->where('event_id', $event_id);
        $revoked = (clone $q)->where('revoked', true)->get(['person_id'])->map(fn($e) => $e['person_id'])->all();
        //excludes from the participants list the persons previously revoked
        $li = collect($participants)->filter(fn($e) => !in_array($e, $revoked))->all();
        $q->whereIn('person_id', $li)->update(['revoked' => true]);
        return [$li, null];
    }

    /**
     * Returns the quantity of subscriptions to an event for time unit
     * 
     * @param int $event_id
     * @param DateTime $start defaul event created_at
     * @param DateTime $end default event start
     * @param string $timeUnit must be one of these: 'y','m','w','d','h' (years, months, weeks, days, hours) default 'd'
     */
    public function subscriptionMetrics(int $event_id, DateTime $start = null, DateTime $end = null, string $timeUnit = 'd') {
        $e = $this->query()->find($event_id);
        if (empty($e)) return [null, 'event not found'];
        $d = ['y' => 'Y', 'm' => 'F', 'w' => 'W', 'd' => 'Y-m-d', 'h' => 'Y-m-d H'];
        if (!array_key_exists($timeUnit, $d)) return ['invalid time unit', null];
        $q = $this->uow->event_participants->query()->where('event_id', $event_id);
        if ($start) $q->where('created_at', '>=', $start);
        if ($end) $q->where('created_at', '<=', $end);
        $r = $q->get('created_at')->groupBy(function($x) use($d, $timeUnit) {
            return Carbon::parse($x->created_at)->format($d[$timeUnit]);
        })->map(fn($li) => $li->count());
        return [$r->all(), null];
    }
}