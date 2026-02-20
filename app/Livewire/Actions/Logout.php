<?php

namespace App\Livewire\Actions;

use App\Contracts\AuthServiceInterface;

class Logout
{
    public function __construct(
        private AuthServiceInterface $authService
    ) {
    }

    /**
     * Log the current user out of the application.
     */
    public function __invoke()
    {
        $this->authService->logout();

        return redirect('/');
    }
}
