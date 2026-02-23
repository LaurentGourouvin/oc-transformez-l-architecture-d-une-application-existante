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

    /**
     * @OA\Put(
     *     path="/api/profile",
     *     summary="Update profile",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", example="user@example.com")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Profile updated"),
     *     @OA\Response(response=422, description="Validation failed"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function updateProfile(ProfileUpdateRequest $request): JsonResponse
    {
        $this->profileService->updateProfile($request->user(), $request->validated());

        return $this->success(new UserResource($request->user()->fresh()), 'Profile updated');
    }

    /**
     * @OA\Get(
     *     path="/api/profile/me",
     *     summary="Get current user profile",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Profile retrieved"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function me(Request $request) : JsonResponse {
        return $this->success(new UserResource($request->user()), 'Profile retrieved');
    }

    /**
     * @OA\Delete(
     *     path="/api/profile",
     *     summary="Delete account",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Account deleted"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function deleteProfile(Request $request) : JsonResponse {
        $this->profileService->deleteProfile($request->user());
        return $this->noContent('Account deleted');
    }
}
