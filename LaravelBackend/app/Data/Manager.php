<?php

namespace App\Data;

abstract class Manager {
    protected $uow;

    function __construct(&$uow) {
        $this->uow = &$uow;
    }

    public abstract function query();
    public abstract function merge($data);
}