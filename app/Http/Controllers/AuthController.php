<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    /**
     * Create user
     */
    public function signup(Request $request)
    {

        try {
            $credentials = $request->only('username', 'email', 'password');

            $user = User::create([
                'name' => $credentials['username'],
                'email' => $credentials['email'],
                'password' => $credentials['password']
            ])->sendEmailVerificationNotification();

            $user->save();
            try {
                $user;
                return response()->json([
                    'succes' => true,
                    'user' => ([
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        // 'email_verified_at' => $user->email_verified_at,
                    ])
                ], 201);
            } catch (Exception $e) {
                return response()->json([
                    'succes' => false,
                    'error' => $e->getMessage()
                ], 500);
            }
        } catch (Exception $e) {
            return response()->json([
                'succes' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->only('username', 'password');

            if (Str::contains($credentials['username'], '@')) {
                if (Auth::attempt(['email' => $credentials['username'], 'password' =>  $credentials['password']])) {

                    $user = Auth::user();
                    return response()->json([
                        'succes' => true,
                        'user' => ([
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                            // 'email_verified_at' => $user->email_verified_at,
                        ])
                    ], 201);
                } else {
                    return response()->json([
                        'succes' => false,
                        'error' => 'User not found'
                    ], 404);
                }
            } else {
                if (Auth::attempt(['name' => $credentials['username'], 'password' =>  $credentials['password']])) {

                    $user = Auth::user();
                    return response()->json([
                        'succes' => true,
                        'user' => ([
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                            'email_verified_at' => $user->email_verified_at,
                        ])
                    ], 201);
                } else {
                    return response()->json([
                        'succes' => false,
                        'error' => 'User not found'
                    ], 404);
                }
            }
        } catch (Exception $e) {

            return response()->json([
                'succes' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        // $request->user()->token()->revoke();
        try {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json([
                'success' => true,
                'message' => 'Successfully logged out'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'succes' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
