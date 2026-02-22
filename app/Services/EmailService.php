<?php

namespace App\Services;

use App\Contracts\EmailServiceInterface;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EmailService implements EmailServiceInterface {

    public function sendEmailVerificationNotification(): void
    {
        Auth::user()->sendEmailVerificationNotification();
        Log::info('EmailService::sendEmailVerificationNotification', ['user' => Auth::user()->email]);
    }

    public function hasVerifiedEmail(): bool
    {
        Log::info('EmailService::hasVerifiedEmail', [
            'user' => Auth::user()->email,
            'status' => Auth::user()->hasVerifiedEmail()
        ]);
        return Auth::user()->hasVerifiedEmail();
    }

    public function sendEmailVerificationNotificationApi(User $user): void
    {
        $user->sendEmailVerificationNotification();
        Log::info('EmailService::sendEmailVerificationNotificationApi', ['user' => $user->email]);
    }

    public function hasVerifiedEmailApi(User $user): bool
    {
        return $user->hasVerifiedEmail();
    }
}
