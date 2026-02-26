<?php

use Illuminate\Support\Facades\Route;

Route::get('reset-password/{token}', function (string $token) {
    $email = request()->get('email');
    return redirect('/app/reset-password?token=' . $token . '&email=' . urlencode($email));
})->name('password.reset');

Route::get('verify-email/{id}/{hash}', function ($id, $hash) {
    return redirect('/app/verify-email/' . $id . '/' . $hash . '?' . request()->getQueryString());
})->middleware(['throttle:6,1'])
    ->name('verification.verify');
