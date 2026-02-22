<?php

namespace App\Http\Controllers\Api;

use App\Contracts\AuthServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\LoginRequest;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    use ApiResponse;

    private AuthServiceInterface $authService;

    public function __construct(AuthServiceInterface $authService) {
        $this->authService = $authService;
    }
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $user = $this->authService->loginApi($request->email, $request->password);
            $token = $user->createToken('api-token')->plainTextToken;

            return $this->success([
                'user'  => new UserResource($user),
                'token' => $token,
            ], 'Login successful');
        } catch (\Illuminate\Auth\AuthenticationException $e) {
            return $this->error('Invalid credentials', 401);
        }
    }

    public function register(RegisterRequest $request) : JsonResponse {
        $user = $this->authService->registerApi($request->name, $request->email, $request->password);

        return $this->created([
           'user'   => new UserResource($user),
        ], 'Registration successful');
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->noContent('Logged out successfully');
    }
}
