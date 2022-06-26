<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        return json_encode($respuesta);
    }
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(route('ViewLogin'));
    }
}
