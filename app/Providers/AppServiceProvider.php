<?php

namespace App\Providers;

use App\Contracts\EmailServiceInterface;
use App\Contracts\PasswordServiceInterface;
use App\Contracts\ProfileServiceInterface;
use App\Services\EmailService;
use App\Services\PasswordService;
use App\Services\ProfileService;
use Illuminate\Support\ServiceProvider;
use App\Contracts\AuthServiceInterface;
use App\Services\AuthService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AuthServiceInterface::class, AuthService::class);
        $this->app->bind(PasswordServiceInterface::class, PasswordService::class);
        $this->app->bind(EmailServiceInterface::class, EmailService::class);
        $this->app->bind(ProfileServiceInterface::class, ProfileService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
