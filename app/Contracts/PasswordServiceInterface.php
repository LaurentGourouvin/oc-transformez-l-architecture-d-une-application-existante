<?php

namespace App\Contracts;

interface PasswordServiceInterface
{
    public function updatePassword(string $password): void;
    public function confirmPassword(string $password): void;
    public function sendPasswordResetLink(string $email): void;
    public function resetPassword(string $email, string $password, string $confrimPassword, string $token): mixed;
}