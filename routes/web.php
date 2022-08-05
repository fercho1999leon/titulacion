<?php

use App\Events\ListenerLineElectricEvent;
use App\Http\Controllers\ControllerConfigRaspberry;
use App\Http\Controllers\ControllerDemonServer;
use App\Http\Controllers\ControllerLogin;
use App\Http\Controllers\ControllerNotify;
use App\Http\Controllers\ControllerUsers;
use App\Http\Controllers\RaspberryController;
use App\Mail\NotifyError;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Rutas del login
Route::get('/', [ControllerLogin::class,'create'])->middleware(['guest','verifyusers'])->name('ViewLogin');
Route::post('/',[ControllerLogin::class,'store'])->middleware('guest');
Route::get('/logout',[ControllerLogin::class,'destroy'])->name('Logout');
//Rutas para la creacion de usuarios
Route::get('/new-user',[ControllerUsers::class,'create'])->middleware('verifyusersroute');
Route::post('/new-user',[ControllerUsers::class,'store'])->middleware('verifyusersroute');
//Rutas despues del login
Route::group(['middleware' => ['auth']],function(){
    //Dashboard
    Route::get('/main', function () {
        setcookie("__token", csrf_token());
        setcookie("XSRF", csrf_token());
        return view('/pages/dashboard/index');
    })->name('ViewDashboard');
    //Configuracion de parametros del microcontrolador

    //Notificaciones
    Route::post('/import/notify',[ControllerNotify::class,'store']);
    Route::post('/remove/notify', [ControllerNotify::class,'remove']);

    //Usuarios actions CRUD
    Route::post('/user/new',[ControllerUsers::class,'store']);
    Route::post('/user/import',[ControllerUsers::class,'read']);
    Route::post('/user/update',[ControllerUsers::class,'update']);
    Route::post('/user/delete',[ControllerUsers::class,'delete']);

    //Almacenamiento de configuraciones para raspberry pi
    Route::post('/config/create',[ControllerConfigRaspberry::class,'create']);
    Route::post('/config/read',[ControllerConfigRaspberry::class,'read']);
    Route::post('/config/delect',[ControllerConfigRaspberry::class,'delect']);
    Route::post('/config/update',[ControllerConfigRaspberry::class,'update']);

});

Route::get('/server', [ControllerDemonServer::class,'start']);
Route::get('/prueba', function () {
    //return Cache::remember();
    return Artisan::call('websockets:serve');
});

Route::get('/auth/api/login',[ControllerLogin::class,'apiLogin']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/auth/api/logout',[ControllerLogin::class,'apiLogout']);
    Route::get('/send/correo',function(){
        $correo = new NotifyError();
        Mail::to('fercho1999_w@hotmail.com')->send($correo);
        return "mensaje enviado";
    });
    Route::get('/event/dashboard', function (Request $request) {
        event(new ListenerLineElectricEvent(intval($request->v1),intval($request->v2),round(floatval($request->a1), 2),intval($request->a2)));
        $response = [
            'msg' => "EVENTO ENVIADO",
        ];
        return response($response, 201);
    });
    Route::get('/api/getconfig',[RaspberryController::class,'getConfiInitial']);
    
});