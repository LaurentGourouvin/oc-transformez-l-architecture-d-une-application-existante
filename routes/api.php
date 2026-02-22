<?php

use App\Http\Controllers\Api\PasswordController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;


// Auth middleware
Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::post('password/confirm', [PasswordController::class, 'confirmPassword']);
});

// Auth Routes
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);

// Password routes
Route::post('password/forgot-password', [PasswordController::class, 'sendPasswordResetLink']);
Route::post('password/reset', [PasswordController::class, 'resetPassword']);
