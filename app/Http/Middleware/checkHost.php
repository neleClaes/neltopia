<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class checkHost
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->getHttpHost() === '127.0.0.1:8000') {
            return $next($request);
        } else {
            return response('Unauthorized Host', 401);
        }
    }
}
