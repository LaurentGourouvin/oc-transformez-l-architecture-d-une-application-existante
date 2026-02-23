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

    /**
     * @OA\Post(
     *     path="/api/auth/login",
     *     summary="Login",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="password", type="string")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Login successful"),
     *     @OA\Response(response=401, description="Invalid credentials")
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/api/auth/register",
     *     summary="Register",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email","password","password_confirmation"},
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", example="user@example.com"),
     *             @OA\Property(property="password", type="string", example="password"),
     *             @OA\Property(property="password_confirmation", type="string", example="password")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Account created successfully"),
     *     @OA\Response(response=422, description="Validation failed")
     * )
     */
    public function register(RegisterRequest $request) : JsonResponse {
        $user = $this->authService->registerApi($request->name, $request->email, $request->password);

        return $this->created([
           'user'   => new UserResource($user),
        ], 'Registration successful');
    }

    /**
     * @OA\Post(
     *     path="/api/auth/logout",
     *     summary="Logout",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Logged out successfully"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->noContent('Logged out successfully');
    }
}
