<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AuthController;
use \App\Http\Controllers\UserController;
use \App\Http\Controllers\FileController;
use \App\Http\Controllers\EventController;
use \App\Http\Controllers\SecurityController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Authentication Controller
Route::middleware(['cors'])->post('auth/login', [AuthController::class, 'login']);
Route::middleware(['cors', 'auth:api'])->get('auth/logout', [AuthController::class, 'logout']);
Route::middleware(['cors', 'auth:api'])->get('auth/user', [AuthController::class, 'user']);

// V1 Endpoints
Route::group(['prefix' => 'v1', 'middleware' => ['cors']], function() {
    // User Endpoints
    Route::post('users/signup', [UserController::class, 'signUp']);
    Route::group(['prefix' => 'users', 'middleware' => ['auth:api']], function () {
        Route::get('my/events', [UserController::class, 'myEvents']);
        Route::get('', [UserController::class, 'index']);
    });
    // Files
    Route::get('files/{key}', [FileController::class, 'index']);
    Route::group(['prefix' => 'files', 'middleware' => ['auth:api']], function() {
        
    });
    // Events
    Route::group(['prefix' => 'events', 'middleware' => ['auth:api']], function() {
        Route::get('', [EventController::class, 'index']);
        Route::post('', [EventController::class, 'create']);
        Route::put('', [EventController::class, 'update']);
        Route::delete('{event_id}', [EventController::class, 'delete']);
        Route::get('{event_id}/participants', [EventController::class, 'getParticipants']);
        Route::put('{event_id}/participants/revoke', [EventController::class, 'revokeParticipants']);
        Route::post('{event_id}/metrics/subscriptions', [EventController::class, 'subscriptionMetrics']);
    });
    // Security
    Route::group(['prefix' => 'security', 'middleware' => ['auth:api']], function() {
        Route::group(['prefix' => 'users'], function() {
            Route::put('disable', [SecurityController::class, 'disableUsers']);
            Route::put('enable', [SecurityController::class, 'enableUsers']);
            Route::put('status', [SecurityController::class, 'updateStatusUsers']);
        });
    });
});
