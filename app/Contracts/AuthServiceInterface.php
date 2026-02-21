<?php

namespace App\Contracts;


interface AuthServiceInterface
{
    public function authenticate(string $email, string $password, bool $remember): void;
    public function register(string $name, string $email, string $password): void;
    public function logout(): void;
}