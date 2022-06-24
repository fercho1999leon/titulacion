<?php

use App\Http\Controllers\ControllerLogin;
use Illuminate\Support\Facades\Route;

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
Route::get('/', [ControllerLogin::class,'create'])->middleware('guest')->name('ViewLogin');
Route::post('/',[ControllerLogin::class,'store'])->middleware('guest');
Route::get('/logout',[ControllerLogin::class,'estroy'])->name('Logout');
//Rutas para la creacion de usuarios

//Rutas despues del login
//Dashboard
Route::get('/main', function () {
    return view('/pages/dashboard/index');
})->middleware(['auth']);
//Configuracion de parametros del microcontrolador
