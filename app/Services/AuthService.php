<?php

namespace App\Services;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use App\Contracts\AuthServiceInterface;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;


class AuthService implements AuthServiceInterface
{
    public function authenticate(string $email, string $password, bool $remember): void
    {
        $this->ensureIsNotRateLimited($email);

        if (!Auth::attempt(['email' => $email, 'password' => $password], $remember)) {
            RateLimiter::hit($this->throttleKey($email));

            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey($email));
        Session::regenerate();

        Log::info('AuthService::auth.succes', ['email' => $email]);

    }

    public function register(string $name, string $email, string $password): void
    {

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);

        event(new Registered($user));
        Auth::login($user);

        Log::info('AuthService::register', ['email' => $email]);

    }

    public function logout(): void
    {
        Auth::guard('web')->logout();
        Session::invalidate();
        Session::regenerateToken();

        Log::info('AuthService::logout');
    }

    protected function ensureIsNotRateLimited(string $email): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey($email), 5)) {
            return;
        }

        event(new Lockout(request()));

        $seconds = RateLimiter::availableIn($this->throttleKey($email));

        throw ValidationException::withMessages([
            'email' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    protected function throttleKey(string $email): string
    {
        return Str::transliterate(Str::lower($email) . '|' . request()->ip());
    }

    public function loginApi(string $email, string $password): User
    {
        if (!Auth::attempt(['email' => $email, 'password' => $password])) {
            throw new \Illuminate\Auth\AuthenticationException('Invalid credentials');
        }

        return Auth::user();
    }

    public function registerApi(string $name, string $email, string $password): User {
        return $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);
    }
}
