<?php

namespace App\Http\Controllers\Api;

use App\Contracts\ProfileServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Profile\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{

    use ApiResponse;

    private ProfileServiceInterface $profileService;
    public function __construct(ProfileServiceInterface $service)
    {
        $this->profileService = $service;
    }

    public function updateProfile(ProfileUpdateRequest $request): JsonResponse
    {
        $this->profileService->updateProfile($request->user(), $request->validated());

        return $this->success(new UserResource($request->user()->fresh()), 'Profile updated');
    }

    public function me(Request $request) : JsonResponse {
        return $this->success(new UserResource($request->user()), 'Profile retrieved');
    }

    public function deleteProfile(Request $request) : JsonResponse {
        $this->profileService->deleteProfile($request->user());
        return $this->noContent('Account deleted');
    }
}
