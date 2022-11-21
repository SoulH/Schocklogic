<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Data\UnitOfWork;


class UserController extends Controller
{
    private $uow;

    function __construct(UnitOfWork $uow) {
        $this->uow = $uow;
    }

    public function index() {
        $li = $this->uow->users->query()->get()->load('person');
        $res = $li->map(function($x) {
            $arr = $x->person->toArray();
            $arr['person_id'] = $x->person->id;
            $arr['id'] = $x->id;
            $arr['email'] = $x->email;
            $arr['name'] = $x->name;
            $arr['is_active'] = $x->is_active;
            return $arr;
        })->all();
        return response()->json($res);
    }

    public function signUp(Request $request) {
        $rules = [
            'first_name' => 'required|string|max:32',
            'last_name' => 'required|string|max:32',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8|max:255',
            'birth_date' => 'nullable|date',
            'is_staff' => 'boolean',
            'is_superuser' => 'boolean'
        ];
        $request->validate($rules);
        $data = array_intersect_key($request->all(), array_flip(array_keys($rules)));
        [$usr, $err] = $this->uow->users->signUp($data);
        [$res, $status] = $err ? [['detail' => $err], 400] : [[], 201];
        return response()->json($res, $status);
    }

    public function myEvents(Request $request) {
        $p = $request->user()->load('person');
        $url_base = $request->getSchemeAndHttpHost();
        $li = $this->uow->events->list($p->id);
        $res = $li->map(function($e) use($url_base) {
            $o = $e->toArray();
            $o['files'] = $e->files->map(function($e) use($url_base) {
                return "$url_base/api/v1/files/$e->file_id";
            })->toArray();
            return $o;
        });
        return response()->json($res);
    }
}
