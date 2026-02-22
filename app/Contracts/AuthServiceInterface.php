<?php

namespace App\Contracts;


use App\Models\User;

interface AuthServiceInterface
{
    public function authenticate(string $email, string $password, bool $remember): void;
    public function register(string $name, string $email, string $password): void;
    public function logout(): void;
    public function loginApi(string $email, string $password) : User;
}
