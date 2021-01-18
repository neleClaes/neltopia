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
            $checkUser = User::Where('email', $request->only('email'))->orWhere('name', $request->only('username'));
            if (!$checkUser->count()) {
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
                ]);
            } else {
                return response()->json([
                    'succes' => false,
                    'error' => "User name and/or email is already registerd!"
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'succes' => false,
                'error' => $e->getMessage()
            ]);
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
                ]);
            } else {
                return response()->json([
                    'succes' => false,
                    'error' => 'User not found'
                ]);
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
                ]);
            } else {
                return response()->json([
                    'succes' => false,
                    'error' => 'User not found'
                ]);
            }
        }
    }

    public function update(Request $request)
    {
        try {

            $checkUser = User::Where('email', '=', $request->only('email'))->Where('id', '!=', $request->only('id'))->orWhere('name', '=', $request->only('username'))->Where('id', '!=', $request->only('id'))->get();
            if (!$checkUser->count()) {
                $credentials = $request->only('username', 'email', 'password');
                User::Where('id', $request->only('id'))->update(['name' => $credentials["username"], 'email' => $credentials["email"], 'password' => $credentials["password"]]);

                return response()->json([
                    'succes' => true
                ]);
            } else {
                return response()->json([
                    'succes' => false,
                    'error' => "User name and/or email is already in use by another user!"
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'succes' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    public function delete(Request $request)
    {
        try {
            $user = User::Where('id', $request->only('id'))->delete();
            return response()->json([
                'succes' => true,
                'user' => $user
            ]);
        } catch (Exception $e) {
            return response()->json([
                'succes' => false,
                'error' => $e->getMessage()
            ]);
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
