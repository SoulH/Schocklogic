<?php

namespace App\Data;

use \App\Models\Role;


class RoleManager extends Manager {
    
    public function query() {
        return Role::query();
    }

    public function merge($data) {
        $rol = null;
        if (array_key_exists('id', $data))
            $rol = $this->query()->find($data['id']);
        if (empty($per)) $rol = new Role();
        $rol->fill($data);
        $rol->save();
        return $rol;
    }
}