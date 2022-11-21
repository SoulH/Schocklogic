<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Data\UnitOfWork;


class SecurityController extends Controller
{
    private $uow;

    function __construct(UnitOfWork $uow) {
        $this->uow = $uow;
    }

    public function disableUsers(Request $request) {
        $this->uow->users->disable($request->all());
        return response('', 202);
    }

    public function enableUsers(Request $request) {
        $this->uow->users->enable($request->all());
        return response('', 202);
    }

    public function updateStatusUsers(Request $request) {
        $res = $this->uow->users->updateStatus($request->all());
        /*foreach($res['disabled'] as $usr) {
            Mail::to($usr)->send('Your user has been disable please check with the administrator');
        }*/
        return response('', 202);
    }
}
