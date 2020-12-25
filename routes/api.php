<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\checkHost;



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

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        // Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        //     return $request->user();
        // });

        Route::middleware([checkHost::class])->post('/login', [UserController::class, 'login']);
        Route::middleware([checkHost::class])->post('/register', [UserController::class, 'register']);
        Route::middleware([checkHost::class])->get('/logout', [UserController::class, 'logout']);
        Route::middleware([checkHost::class])->post('/update', [UserController::class, 'update']);

        Route::get('email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify');
        Route::get('email/resend', [VerificationController::class, 'resend'])->name('verification.resend');
    });
});
