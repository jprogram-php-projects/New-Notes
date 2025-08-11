<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'username' => 'required|string',
                'password' => 'required|string',
            ]);

            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
            }

            $ttl = config('jwt.ttl') * 60; // em segundos
            $user = Auth::user();

            return response()->json([
                'success'    => true,
                'token'      => $token,
                'expires_in' => $ttl,
                'username'   => $user->username
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'success'   => false,
                'message'   => 'Erro interno',
                'error'     => $e->getMessage()
            ], 500);
        }
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['success' => true]);
    }

}
