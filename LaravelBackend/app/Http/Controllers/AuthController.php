<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Data\UnitOfWork;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;


class AuthController extends Controller
{
    private $uow;

    function __construct(UnitOfWork $uow) {
        $this->uow = $uow;
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $email = $request->get('email');
        $passw = $request->get('password');
        [$usr, $err] = $this->uow->users->authenticate($email, $passw);
        if ($usr) {
            $tokenResult = $usr->createToken('Personal Access Token');
            [$now, $token] = [Carbon::now(), $tokenResult->token];
            $token->expires_at = $request->remember_me ? $now->addWeeks(1) : $now->addHours(1);
            $token->save();
            $res = ['user' => $usr->toArray(), 'access_token' => $tokenResult->accessToken];
            return response()->json($res, 201);
        }
        return response()->json(['detail' => $err], 401);
    }

    public function logout(Request $request) {
        $request->user()->token()->revoke();
        return response('', 202);
    }

    public function user(Request $request) {
        return response()->json($request->user());
    }
}
