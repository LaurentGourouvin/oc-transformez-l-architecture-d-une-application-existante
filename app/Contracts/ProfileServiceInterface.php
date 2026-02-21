<?php

namespace App\Contracts;

use App\Models\User;

interface ProfileServiceInterface
{
    public function updateProfile(User $user, array $validated): void;
    public function deleteProfile(User $user): void;
}
