<?php

namespace App\Contracts;

interface EmailServiceInterface {
    public function sendEmailVerificationNotification(): void;
    public function hasVerifiedEmail(): bool;
}
