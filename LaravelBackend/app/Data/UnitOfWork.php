<?php 

namespace App\Data;

use Illuminate\Support\Facades\DB;


class UnitOfWork {
    private $state = [];

    public function __get($name) {
        if (array_key_exists($name, $this->state))
            return $this->state[$name];
        switch($name) {
            case 'persons':
                $this->state[$name] = new PersonManager($this);
                break;
            case 'users':
                $this->state[$name] = new UserManager($this);
                break;
            case 'roles':
                $this->state[$name] = new RoleManager($this);
                break;
            case 'files':
                $this->state[$name] = new FileManager($this);
                break;
            case 'events':
                $this->state[$name] = new EventManager($this);
                break;
            case 'event_files':
                $this->state[$name] = new EventFileManager($this);
                break;
            case 'event_participants':
                $this->state[$name] = new EventParticipantManager($this);
                break;
            default:
                return null;
                
        }
        return $this->state[$name];
    }
}