<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class MiddlewareVerifyUsers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(env('AUTORIZED_CREATE_NEW_USERS')){
            $user = User::select('username','name','email')->get();
            if(!$user->isNotEmpty()){
                return redirect(route('FormsNewUsers'));
            }
        }
        return $next($request);
    }
}
