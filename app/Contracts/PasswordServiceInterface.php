<?php

namespace App\Contracts;

use App\Models\User;

interface PasswordServiceInterface
{
    public function updatePassword(string $password): void;
    public function confirmPassword(string $password): void;
    public function confirmPasswordApi(string $password, User $user): void;

    public function sendPasswordResetLink(string $email): void;
    public function resetPassword(string $email, string $password, string $confirmPassword, string $token): mixed;
}
