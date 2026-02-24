<?php

namespace App\Http\Controllers\Api;

use App\Contracts\PasswordServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Password\PasswordConfirmRequest;
use App\Http\Requests\Api\Password\PasswordResetLinkRequest;
use App\Http\Requests\Api\Password\PasswordResetRequest;
use App\Http\Requests\Api\Password\PasswordUpdateRequest;
use Illuminate\Support\Facades\Password;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PasswordController extends Controller
{
    use ApiResponse;

    private PasswordServiceInterface $passwordService;

    public function __construct(PasswordServiceInterface $passwordService) {
        $this->passwordService = $passwordService;
    }

    /**
     * @OA\Post(
     *     path="/api/password/forgot-password",
     *     summary="Send password reset link",
     *     tags={"Password"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email"},
     *             @OA\Property(property="email", type="string", example="user@example.com")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Reset link sent"),
     *     @OA\Response(response=422, description="Validation failed")
     * )
     */
    public function sendPasswordResetLink (PasswordResetLinkRequest $request) : JsonResponse {
        $this->passwordService->sendPasswordResetLink($request->email);
        return $this->success(null, 'If this email exists, a reset link has been sent');
    }

    /**
     * @OA\Post(
     *     path="/api/password/reset",
     *     summary="Reset password",
     *     tags={"Password"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","token","password","password_confirmation"},
     *             @OA\Property(property="email", type="string", example="user@example.com"),
     *             @OA\Property(property="token", type="string", example="abc123"),
     *             @OA\Property(property="password", type="string", example="newpassword"),
     *             @OA\Property(property="password_confirmation", type="string", example="newpassword")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Password reset successfully"),
     *     @OA\Response(response=400, description="Invalid token"),
     *     @OA\Response(response=422, description="Validation failed")
     * )
     */
    public function resetPassword(PasswordResetRequest $request): JsonResponse {
        try {
            $status = $this->passwordService->resetPassword(
                $request->email,
                $request->password,
                $request->password_confirmation,
                $request->token
            );

            if ($status !== Password::PASSWORD_RESET) {
                return $this->error(__($status), 400);
            }

            return $this->success(null, 'Password reset successfully');
        } catch (\RuntimeException $e) {
            return $this->error($e->getMessage(), 400);
        }    }

    /**
     * @OA\Post(
     *     path="/api/password/confirm",
     *     summary="Confirm password",
     *     tags={"Password"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"password"},
     *             @OA\Property(property="password", type="string", example="password")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Password confirmed"),
     *     @OA\Response(response=422, description="Wrong password"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function confirmPassword(PasswordConfirmRequest $request): JsonResponse
    {
        try {
            $this->passwordService->confirmPasswordApi($request->password, $request->user());
            return $this->success(null, 'Password confirmed');
        } catch (\RuntimeException $e) {
            return $this->error($e->getMessage(), 422);
        }
    }

    /**
     * @OA\Patch(
     *     path="/api/password/update",
     *     summary="Update password",
     *     tags={"Password"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"current_password","password","password_confirmation"},
     *             @OA\Property(property="current_password", type="string", example="oldpassword"),
     *             @OA\Property(property="password", type="string", example="newpassword"),
     *             @OA\Property(property="password_confirmation", type="string", example="newpassword")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Password updated successfully"),
     *     @OA\Response(response=422, description="Validation failed"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function updatePassword(PasswordUpdateRequest $request): JsonResponse {
        $this->passwordService->updatePasswordApi($request->password, $request->user());
        return $this->success(null, 'Password updated successfully');
    }
}
