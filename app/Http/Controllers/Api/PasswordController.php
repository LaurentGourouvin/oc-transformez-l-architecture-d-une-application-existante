<?php

namespace App\Http\Controllers\Api;

use App\Contracts\PasswordServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Password\PasswordConfirmRequest;
use App\Http\Requests\Api\Password\PasswordResetLinkRequest;
use App\Http\Requests\Api\Password\PasswordResetRequest;
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

    public function sendPasswordResetLink (PasswordResetLinkRequest $request) : JsonResponse {
        $this->passwordService->sendPasswordResetLink($request->email);
        return $this->success(null, 'If this email exists, a reset link has been sent');
    }

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

    public function confirmPassword(PasswordConfirmRequest $request): JsonResponse
    {
        try {
            $this->passwordService->confirmPasswordApi($request->password, $request->user());
            return $this->success(null, 'Password confirmed');
        } catch (\RuntimeException $e) {
            return $this->error($e->getMessage(), 422);
        }
    }
}
