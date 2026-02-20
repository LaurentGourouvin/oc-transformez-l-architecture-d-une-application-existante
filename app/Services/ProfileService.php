<?php

namespace App\Services;

use App\Contracts\ProfileServiceInterface;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class ProfileService implements ProfileServiceInterface
{

    public function updateProfile(User $user, array $validated): void
    {
        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        Log::info('ProfileService::updateProfile', ['user' => $user->email]);
    }

    public function deleteProfile(User $user): void
    {
        $user->delete();
        Log::info('ProfileService::deleteProfile', ['user' => $user->email]);    }
}
