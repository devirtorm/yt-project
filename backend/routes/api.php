<?php

use App\Http\Controllers\api\authController;
use App\Http\Controllers\api\CategoriaController;
use App\Http\Controllers\api\ComentarioController;
use App\Http\Controllers\api\LikeController;
use App\Http\Controllers\api\PlaylistController;
use App\Http\Controllers\api\PlaylistVideoController;
use App\Http\Controllers\api\SearchController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\videoController;
use App\Http\Controllers\historialController;
use App\Http\Controllers\RespuestasComentariosController;
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
Route::get('users',[UserController::class, 'index']); // Mostrar usuarios
Route::put('/users/{id}', [UserController::class, 'update']); //Actualizar el usuario
Route::post('login',[authController::class, 'access']); // login
Route::post('videos',[videoController::class, 'upload']); // Guardar video
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
Route::get('videos/aceptados', [videoController::class, 'videosAceptados']);
Route::get('videos/rechazados', [videoController::class, 'videosRechazados']);

//Mostrar los videos de los usuarios
Route::get('users/{userId}/videos', [VideoController::class, 'showUserVideos']);
Route::get('users/{userId}', [UserController::class, 'show']);

Route::get('videos/{video}',[videoController::class, 'show']); // Mostrar video

//Muestra los videos de un usuario especifico
Route::get('/users/{id}/videos', [UserController::class, 'videos']);

//Muestra los videos en estado 1 de un usuario especifico
Route::get('/users/{id}/videos-activos', [UserController::class, 'videosActivos']);

//Comentarios
Route::post('comentarios',[ComentarioController::class, 'store']); // crear comentario
Route::get('comentarios',[ComentarioController::class, 'index']); // Mostrar todos los comentarios
Route::get('comentarios/{comentario}',[ComentarioController::class, 'show']); // Mostrar un comentario
Route::patch('comentarios/{comentario}',[ComentarioController::class, 'update']); // Actualizar un comentario
Route::delete('comentarios/{comentario}',[ComentarioController::class, 'destroy']); //Eliminar un comentario

//Respuestas de comentarios
Route::post('comentarios/respuestas',[RespuestasComentariosController::class, 'store']); // crear respuestas
Route::get('comentarios/respuestas',[RespuestasComentariosController::class, 'index']); // Mostrar todas las respuestas
Route::get('comentarios/respuestas/{respuesta}',[RespuestasComentariosController::class, 'show']); // Mostrar una respuesta
Route::put('comentarios/respuestas/{respuesta}',[RespuestasComentariosController::class, 'update']); // Actualizar una respuesta
Route::delete('comentarios/respuestas/{respuesta}',[RespuestasComentariosController::class, 'destroy']); //Eliminar una respuesta

//Las respuestas de un comentario
Route::get('/comentarios/{id}/respuestas', [ComentarioController::class, 'respuestas']);

//Las respuestas de un comentario
Route::get('/comentarios/{id}/respuestas', [ComentarioController::class, 'respuestas']);

//Buscador
Route::get('search/all', [SearchController::class, 'searchAll']);

//Mostrar los comentarios de un video
Route::get('videos/{videoId}/comentarios', [VideoController::class, 'showComentarios']);

Route::post('likes', [LikeController::class, 'addLike']);
Route::delete('likes', [LikeController::class, 'removeLike']);
Route::get('/users/{userId}/likes', [LikeController::class, 'getUserLikes']);
Route::get('/videos/{videoId}/likes', [LikeController::class, 'getVideoLikes']);
Route::post('/likes/search', [LikeController::class, 'searchLike']);


//################ RUTAS PARA PLAYLIST #####################
Route::post('playlists', [PlaylistController::class, 'store']);
Route::delete('playlists/{playlist}', [PlaylistController::class, 'destroy']);
Route::get('/users/{userId}/playlists',[PlaylistController::class, 'index']);
Route::post('/playlist_videos', [PlaylistVideoController::class, 'store']);
Route::get('/playlists/{playlist}/videos', [PlaylistController::class, 'getPlaylistVideos']);


//################ RUTA PARA EL HISTORIAL ##################
Route::post('/historial', [historialController::class, 'store']);
Route::get('/users/{userId}/historial', [historialController::class, 'index']);

Route::get('users',[UserController::class, 'index']);   


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('users',[UserController::class, 'index']);   
    
    //Para dar like


});


