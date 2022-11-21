<?php

namespace App\Data;

use \App\Data\Manager;
use \App\Models\EventFile;
use \App\Models\Event;
use \App\Utils\FileUtil;


class EventFileManager extends Manager {

    public function query() {
        return EventFile::query();
    }

    public function merge($data) {
        $event = $this->query()->where('event_id', $data['event_id'])
            ->where('file_id', $data['file_id'])->first();
        if (empty($event)) $event = new EventFile();
        $event->fill($data);
        $event->save();
        return $event;
    }

    public function upsert(int $event_id, Array $files) {
        $ids = collect($files)->filter(fn($x) => array_key_exists('id', $x))->map(fn($x) => $x['id'])->all();
        $add = collect($files)->filter(fn($x) => array_key_exists('data', $x))->all();
        $q = $this->query()->where('event_id', $event_id);
        $del = (clone $q)->whereNotIn('file_id', $ids);
        $ids = $del->get('file_id')->map(fn($x) => $x['file_id'])->all();
        $this->uow->files->delete($ids);
        $li = $this->uow->files->insert($add);
        $last = $q->orderBy('order', 'desc')->first();
        $last = $last ? $last->order : 0;
        $li = collect($li)->map(function($x, $k) use($event_id, $last) {
           return ['event_id' => $event_id, 'file_id' => $x, 'order' => $k + $last + 1]; 
        });
        EventFile::insert($li->all());
    }
}