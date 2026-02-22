<?php

namespace App\Services;

use App\Contracts\PasswordServiceInterface;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;


class PasswordService implements PasswordServiceInterface
{
    public function updatePassword(string $password): void
    {
        Auth::user()->update([
            'password' => Hash::make($password),
        ]);

        Log::info('PasswordService::updatePassword', ['user' => Auth::user()->email]);
    }
    public function updatePasswordApi(string $password, User $user): void
    {
        $user->update([
            'password' => Hash::make($password),
        ]);

        Log::info('PasswordService::updatePasswordApi', ['user' => $user->email]);
    }

    public function confirmPassword(string $password): void
    {
        if (
            !Auth::guard('web')->validate([
                'email' => Auth::user()->email,
                'password' => $password,
            ])
        ) {
            throw ValidationException::withMessages([
                'password' => __('auth.password'),
            ]);
        }

        Log::info('PasswordService::confirmPassword', ['user' => Auth::user()->email]);
    }

    public function confirmPasswordApi(string $password, User $user): void
    {
        if (!Hash::check($password, $user->password)) {
            throw new \RuntimeException(__('auth.password'));
        }

        Log::info('PasswordService::confirmPasswordApi', ['user' => $user->email]);
    }

    public function sendPasswordResetLink(string $email): void
    {
        Password::sendResetLink(['email' => $email]);
        Log::info('PasswordService::sendPasswordResetLink', ['user' => $email]);
    }

    public function resetPassword(string $email, string $password, string $confirmPassword, string $token): mixed
    {
        $status = Password::reset(
            ['email'=> $email, 'password' => $password, 'password_confirmation' => $confirmPassword, 'token' => $token],
            function ($user) use($password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        Log::info('PasswordService::resetPassword', ['user' => $email,'status' => $status]);

        return $status;
    }
}
