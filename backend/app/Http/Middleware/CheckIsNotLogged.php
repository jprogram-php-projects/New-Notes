<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class CheckIsNotLogged
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            // Se houver token no header
            if ($request->bearerToken()) {
                $user = JWTAuth::parseToken()->authenticate();
                if ($user) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Você já está logado. Não pode acessar o login.'
                    ], 403);
                }
            }
        } catch (TokenExpiredException | TokenInvalidException | JWTException $e) {
            // Token inválido, expirado ou ausente → pode prosseguir
        }

        return $next($request);
    }
}
