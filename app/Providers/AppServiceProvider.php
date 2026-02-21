<?php

namespace App\Providers;

use App\Contracts\EmailServiceInterface;
use App\Contracts\NotesServiceInterface;
use App\Contracts\PasswordServiceInterface;
use App\Contracts\ProfileServiceInterface;
use App\Contracts\TagsServiceInterface;
use App\Services\EmailService;
use App\Services\NotesService;
use App\Services\PasswordService;
use App\Services\ProfileService;
use App\Services\TagsService;
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
        $this->app->bind(NotesServiceInterface::class, NotesService::class);
        $this->app->bind(TagsServiceInterface::class, TagsService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
