<?php

use App\Http\Controllers\api\authController;
use App\Http\Controllers\api\CategoriaController;
use App\Http\Controllers\api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('users',[UserController::class, 'store']); // crear usuario
Route::post('login',[authController::class, 'access']); // crear usuario

//Categoría
Route::get('categoria',[CategoriaController::class, 'index']);
Route::post('categoria',[CategoriaController::class, 'store']);
Route::get('categoria/{categoria}',[CategoriaController::class, 'show']);
Route::put('categoria/{categoria}',[CategoriaController::class, 'update']);
Route::delete('categoria/{categoria}',[CategoriaController::class, 'destroy']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('users',[UserController::class, 'index']);    
});


