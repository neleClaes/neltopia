<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class VerificationController extends Controller
{
    public function verify($user_id, Request $request)
    {
        if (!$request->hasValidSignature()) {
            return response()->json(["msg" => "Invalid/Expired url provided."], 401);
        }

        $user = User::findOrFail($user_id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        return redirect()->to('/');
    }

    public function resend(Request $request)
    {
        $authuser = User::Where('id', $request->only('id'));

        if (!$authuser->email_verified_at == null) {
            return response()->json(["msg" => "Email already verified."], 400);
        }

        $authuser->sendEmailVerificationNotification();

        return response()->json(["msg" => "Email verification link sent on your email id"]);
    }
}
