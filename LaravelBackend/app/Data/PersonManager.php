<?php

namespace App\Data;

use \App\Models\Person;


class PersonManager extends Manager {

    public function query() {
        return Person::query();
    }

    public function merge($data) {
        $per = null;
        if (array_key_exists('id', $data))
            $per = $this->query()->find($data['id']);
        elseif (array_key_exists('identification', $data))
            $per = $this->query()->where('identification', $data['identification']);
        if (empty($per)) $per = new Person();
        $per->fill($data);
        $per->save();
        return $per;
    }
}