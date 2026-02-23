<?php

namespace App\Http\Controllers\Api;

use App\Contracts\EmailServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailController extends Controller
{

    use ApiResponse;

    private EmailServiceInterface $emailService;

    public function __construct(EmailServiceInterface $emailService )
    {
        $this->emailService = $emailService;
    }

    /**
     * @OA\Post(
     *     path="/api/email/verify/send",
     *     summary="Send email verification",
     *     tags={"Email"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Verification email sent"),
     *     @OA\Response(response=400, description="Email already verified"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function sendVerification(Request $request): JsonResponse
    {
        if ($this->emailService->hasVerifiedEmailApi($request->user())) {
            return $this->error('Email already verified', 400);
        }

        $this->emailService->sendEmailVerificationNotificationApi($request->user());

        return $this->success(null, 'Verification email sent');
    }}
