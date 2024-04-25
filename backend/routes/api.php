<?php

use App\Http\Controllers\api\authController;
use App\Http\Controllers\api\CategoriaController;
use App\Http\Controllers\api\ComentarioController;
use App\Http\Controllers\api\LikeController;
use App\Http\Controllers\api\SearchController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\videoController;
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
Route::post('videos',[videoController::class, 'upload']); // crear usuario
Route::get('videos',[videoController::class, 'index']); // ver lista de videos
Route::get('comentarios',[videoController::class, 'comentario']); // ver lista de videos

Route::put('videos/{video}',[videoController::class, 'update']); // Actualizar video
Route::patch('videos/{id}',[videoController::class, 'revisarVideos']); // Actualizar el estado del video
Route::delete('videos/{video}',[videoController::class, 'destroy']); // Eliminar video

//Categoría
Route::get('categoria',[CategoriaController::class, 'index']);
Route::post('categoria',[CategoriaController::class, 'store']);
Route::get('categoria/{categoria}',[CategoriaController::class, 'show']);
Route::put('categoria/{categoria}',[CategoriaController::class, 'update']);
Route::delete('categoria/{categoria}',[CategoriaController::class, 'destroy']);

//Mostrar videos en 1
Route::get('videos/active', [videoController::class, 'showActiveVideos']);

//Mostrar videos en 0
Route::get('videos/inactive', [videoController::class, 'showInactiveVideos']);

//Mostrar los videos de los usuarios
Route::get('users/{userId}/videos', [VideoController::class, 'showUserVideos']);
Route::get('users/{userId}', [UserController::class, 'show']);

Route::get('videos/{video}',[videoController::class, 'show']); // Mostrar video

//Comentarios
Route::post('comentarios',[ComentarioController::class, 'store']); // crear comentario
Route::get('comentarios',[ComentarioController::class, 'index']); // Mostrar todos los comentarios
Route::get('comentarios/{comentario}',[ComentarioController::class, 'show']); // Mostrar un comentario
Route::delete('comentarios/{comentario}',[ComentarioController::class, 'destroy']); //Eliminar un comentario

//Buscador
Route::get('search/videos', [SearchController::class, 'searchVideos']); //Buscar videos

Route::get('search/users', [SearchController::class, 'searchUsers']); //Buscar usuarios




Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('users',[UserController::class, 'index']);   
    
    //Para dar like
Route::post('videos/{video}/like', [LikeController::class, 'toggleLike']);

});


