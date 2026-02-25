<?php

namespace App\Http\Controllers\Api;

use App\Contracts\EmailServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponse;
use App\Models\User;
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
    }

    /**
     * @OA\Get(
     *     path="/api/email/verify/{id}/{hash}",
     *     summary="Verify email address",
     *     tags={"Email"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="hash",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="expires",
     *         in="query",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="signature",
     *         in="query",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=200, description="Email verified successfully"),
     *     @OA\Response(response=400, description="Invalid verification link"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function verify(Request $request, int $id, string $hash): JsonResponse
    {
        $user = User::findOrFail($id);

        if (! hash_equals($hash, sha1($user->getEmailForVerification()))) {
            return $this->error('Invalid verification link', 400);
        }

        if ($user->hasVerifiedEmail()) {
            return $this->success(null, 'Email already verified');
        }

        $user->markEmailAsVerified();
        event(new \Illuminate\Auth\Events\Verified($user));

        return $this->success(null, 'Email verified successfully');
    }
}


