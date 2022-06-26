<?php

use App\Http\Controllers\ControllerLogin;
use App\Http\Controllers\ControllerUsers;
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
Route::get('/', [ControllerLogin::class,'create'])->middleware('guest','verifyusers')->name('ViewLogin');
Route::post('/',[ControllerLogin::class,'store'])->middleware('guest');
Route::get('/logout',[ControllerLogin::class,'destroy'])->name('Logout');
//Rutas para la creacion de usuarios
Route::get('/new-user',[ControllerUsers::class,'create'])->middleware('guest','verifyusersroute')->name('FormsNewUsers');
Route::post('/new-user',[ControllerUsers::class,'store'])->middleware('guest','verifyusersroute')->name('FormsNewUsers');
//Rutas despues del login
//Dashboard
Route::get('/main', function () {
    return view('/pages/dashboard/index');
})->middleware(['auth'])->name('ViewDashboard');
//Configuracion de parametros del microcontrolador
