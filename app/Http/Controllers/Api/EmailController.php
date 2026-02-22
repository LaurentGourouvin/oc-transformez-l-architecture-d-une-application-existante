<?php

namespace App\Http\Controllers\Api;

use App\Contracts\EmailServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponse;
use App\Services\EmailService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailController extends Controller
{

    use ApiResponse;

    private EmailServiceInterface $emailService;

    public function __construct(EmailService $emailService )
    {
        $this->emailService = $emailService;
    }

    public function sendVerification(Request $request): JsonResponse
    {
        if ($this->emailService->hasVerifiedEmailApi($request->user())) {
            return $this->error('Email already verified', 400);
        }

        $this->emailService->sendEmailVerificationNotificationApi($request->user());

        return $this->success(null, 'Verification email sent');
    }}
