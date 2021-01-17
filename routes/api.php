<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatsController;
use App\Http\Controllers\FollowsController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('login', [AuthController::class, 'login']);

    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
        Route::post('/p', [PostController::class, 'store']);
        Route::get('/follow/{user}', [FollowsController::class, 'store']);
        Route::get('/messages', [ChatsController::class, 'fetchMessages']);
        Route::post('/messages', [ChatsController::class, 'sendMessage']);
    });
});

Route::get('/profile/{profile}', [ProfileController::class, 'show']);
Route::get('/{user}/posts', [PostController::class, 'index']);
Route::get('/following/{user}', [FollowsController::class, 'following']);
Route::get('/followers/{user}', [FollowsController::class, 'followers']);

