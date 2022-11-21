<?php

namespace App\Data;

use \App\Models\EventParticipant;
use \App\Models\Event;
use \App\Models\Person;


class EventParticipantManager extends Manager {
    public function query() {
        return EventParticipant::query();
    }

    public function merge($data) {
        $event = $this->query()->where('event_id', $data['event_id'])
            ->where('person_id', $data['person_id'])->first();
        if (empty($event)) $event = new EventParticipant();
        $event->fill($data);
        $event->save();
        return $event;
    }
}