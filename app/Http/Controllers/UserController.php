<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Exception;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try {
            // $this->validator($request->all())->validate();
            $credentials = $request->only('username', 'email', 'password');

            $user = User::create([
                'name' => $credentials['username'],
                'email' => $credentials['email'],
                'password' => $credentials['password']
            ]);

            $user->save();
            $user->sendEmailVerificationNotification();

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
    }
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            //'password' => ['required', 'string', 'min:4', 'confirmed'],
            // NO PASSWORD CONFIRMATION
            'password' => ['required', 'string', 'min:4'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);
    }
    protected function guard()
    {
        return Auth::guard();
    }

    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (Str::contains($credentials['username'], '@')) {
            if (Auth::attempt(['email' => $credentials['username'], 'password' =>  $credentials['password']])) {
                // Authentication passed...
                $authuser = auth()->user();
                return response()->json([
                    'succes' => true,
                    'user' => ([
                        'id' => $authuser->id,
                        'name' => $authuser->name,
                        'email' => $authuser->email,
                        'email_verified_at' => $authuser->email_verified_at,
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

                $authuser = auth()->user();

                return response()->json([
                    'succes' => true,
                    'user' => ([
                        'id' => $authuser->id,
                        'name' => $authuser->name,
                        'email' => $authuser->email,
                        'email_verified_at' => $authuser->email_verified_at,
                    ])
                ], 201);
            } else {
                return response()->json([
                    'succes' => false,
                    'error' => 'User not found'
                ], 404);
            }
        }
    }

    public function logout()
    {
        try {
            Auth::logout();

            return response()->json([
                'succes' => true,
                'message' => 'Successfully logged out'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'succes' => false,
                'error' => $e->getMessage()
            ]);
        }
    }
}
