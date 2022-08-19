<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ControllerLogin extends Controller
{
    public function create(){
        setcookie("__token", csrf_token());  //Ya esta agregado el CSRF token en una meta del HTML
        return view('/pages/login/index');
    }
    public function store(Request $request){
        $user = $request->username;
        $pass = $request->password;
        if (Auth::attempt(['username' => $user, 'password' => $pass,'active' => 1])) {
            $request->session()->regenerate();
            return redirect()->intended(route('ViewDashboard'));
        }
        $respuesta = array(
            'code' => 1,
            'body' => 'Error credenciales no coincides'
        );

        return response(json_encode($respuesta),201);
    }

    public function apiLogin(Request $request){
        $fields = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);
        $user = User::where('username', $fields['username'])->first();
        if (! $user || ! Hash::check($fields['password'], $user->password)) {
            throw ValidationException::withMessages([
                'message' => ['Unauthorized']
            ]);
        }
        $token = $user->createToken('raspberry')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }

    public function apiLogout(Request $request) {
        Auth::user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }

    public function destroy(Request $request)
    {
        
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(route('ViewLogin'));
    }
}
