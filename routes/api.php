<?php

use App\Http\Controllers\Api\EmailController;
use App\Http\Controllers\Api\PasswordController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;


// Auth middleware
Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::post('password/confirm', [PasswordController::class, 'confirmPassword']);
    Route::post('password/update', [PasswordController::class, 'updatePassword']);
    Route::get('profile/me', [ProfileController::class, 'me']);
    Route::put('profile', [ProfileController::class, 'updateProfile']);
    Route::delete('profile', [ProfileController::class, 'deleteProfile']);
    Route::post('email/verify/send', [EmailController::class, 'sendVerification']);
});

// Auth Routes
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);

// Password routes
Route::post('password/forgot-password', [PasswordController::class, 'sendPasswordResetLink']);
Route::post('password/reset', [PasswordController::class, 'resetPassword']);
