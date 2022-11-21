<?php

namespace App\Data;

use \App\Data\Manager;
use \App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserManager extends Manager {
    public function query() {
        return User::query();
    }

    public function merge($data) {
        $usr = null;
        if (array_key_exists('id', $data))
            $usr = $this->query()->find($data['id']);
        elseif (array_key_exists('email', $data)) 
            $usr = $this->query()->where('email', $data['email'])->first();
        if (empty($usr)) $usr = new User();
        $usr->fill($data);
        $usr->save();
        return $usr;
    }

    public function authenticate(string $email,  string $password) {
        $usr = $this->query()->where('email', $email)->first();
        if (!$usr) return [null, 'User not found'];
        if (!$usr->is_active) return [null, 'Inactive account'];
        if (!Hash::check($password, $usr->password)) 
            return [null, 'Password mismatch'];
        if (Hash::needsRehash($usr->password)) {
            $usr->password = Hash::make($password);
            $usr->save();
        } 
        return [$usr, null];
    }

    public function signUp($data) {
        $email = $data['email'];
        if ($this->query()->where('email', $email)->count())
            return [null, "we already have registered an account with $email, please check"];
        $per = $this->uow->persons->merge($data);
        $data['name'] = explode(' ', $data['first_name'])[0];
        $data['password'] = Hash::make($data['password']);
        $data['person_id'] = $per->id;
        $data['is_active'] = true;
        $usr = $this->merge($data);
        return [$usr, null];
    }

    public function disable(Array $users) {
        $q = $this->query()->whereIn('id', $users);
        $count = $q->update(['is_active' => false]);
        return $count ? [$q->get(), null] : [null, 'unexpected error'];
    }

    public function enable(Array $users) {
        $q = $this->query()->whereIn('id', $users);
        $count = $q->update(['is_active' => true]);
        return $count ? [$q->get(), null] : [null, 'unexpected error'];
    }

    public function updateStatus(Array $status) {
        $toEnable = array_keys(collect($status)->filter(fn($x) => $x)->all());
        $toDisable = array_keys(collect($status)->filter(fn($x) => !$x)->all());
        $en = $this->enable($toEnable);
        $dis = $this->disable($toDisable);
        return ['enabled' => $en, 'disabled' => $dis];
    }
}