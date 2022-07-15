<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ControllerUsers extends Controller
{
    public function create(Request $request){
        setcookie("__token", csrf_token());  //Ya esta agregado el CSRF token en una meta del HTML
        return view('/pages/createusers/index');
    }
    public function store(Request $request){
        $user = new User();
        $user->username = $request->username;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->active = 1;
        $user->password = Hash::make($request->password);
        $user->save();
        $respuesta = array(
            'code' => 0,
            'body' => User::select('id','username','name','email')->get()
        );
        return json_encode($respuesta);
    }

    public function read(){
        $user = User::select('id','username','name','email')->get();
        return $user;
    }

    public function delete(Request $request){
        User::where('id',$request->id)->delete();
        return json_encode(User::select('id','username','name','email')->get());
    }

    public function update(Request $request){
        User::where('id',$request->id)->update(
            [
                'username'=>$request->username,
                'name'=>$request->name,
                'email'=>$request->email,
                'active'=>1,
                'password'=>Hash::make($request->password)
            ]
        );
        $respuesta = array(
            'code' => 0,
            'body' => User::select('id','username','name','email')->get()
        );
        return json_encode($respuesta);

    }
}
