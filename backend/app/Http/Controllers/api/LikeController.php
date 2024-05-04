<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LikeResource;
use App\Models\Like;
use App\Models\Video;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addLike(Request $request)
    {
        $request->validate([
            'fk_usuario' => 'required|exists:users,id', // Validar que el usuario existe
            'fk_video' => 'required|exists:video,id', // Validar que el video existe
            'like' => 'required|boolean', // El like debe ser booleano
        ]);

        // Buscar si ya existe un like del usuario para el video
        $existingLike = Like::where('fk_usuario', $request->fk_usuario)
            ->where('fk_video', $request->fk_video)
            ->first();

        // Si ya existe un like del usuario para el video
        if ($existingLike) {
            // Si el like enviado es verdadero, simplemente retornamos un mensaje indicando que ya existe
            $existingLike->delete();
            return response()->json(['message' => 'Like eliminado con éxito'], 200);
        }

        // Si no existe un like del usuario para el video, creamos uno nuevo
        $like = new Like();
        $like->fk_usuario = $request->fk_usuario;
        $like->fk_video = $request->fk_video;
        $like->like = true; // Se establece como verdadero, ya que este es el primer like del usuario para el video
        $like->save();

        return response()->json(['message' => 'Like agregado con éxito'], 200);
    }



    // Método para eliminar un like
    public function removeLike(Request $request)
    {
        $request->validate([
            'fk_usuario' => 'required|exists:users,id', // Validar que el usuario existe
            'fk_video' => 'required|exists:video,id', // Validar que el video existe
        ]);

        // Buscar y eliminar el like
        Like::where('fk_usuario', $request->fk_usuario)
            ->where('fk_video', $request->fk_video)
            ->delete();

        return response()->json(['message' => 'Like eliminado con éxito'], 200);
    }

    // Método para obtener todos los likes de un usuario
    public function getUserLikes($userId)
    {
        $likes = Like::with('user')->with('video')->where('fk_usuario', $userId)->get();
    
        return LikeResource::collection($likes);
    }

    // Método para obtener todos los likes de un video
    public function getVideoLikes($videoId)
    {
        $likes = Like::where('fk_video', $videoId)->get();

        return response()->json(['data' => $likes], 200);
    }


    public function searchLike(Request $request)
    {
        // Validar los datos de la solicitud
        $request->validate([
            'fk_usuario' => 'required|exists:users,id',
            'fk_video' => 'required|exists:video,id',
        ]);

        try {
            // Buscar el like en la base de datos
            $like = Like::where('fk_usuario', $request->fk_usuario)
                        ->where('fk_video', $request->fk_video)
                        ->first();

            if ($like) {
                // Si se encuentra el like, devolver los datos del like con código 200
                return response()->json($like, 200);
            } else {
                // Si no se encuentra el like, devolver un mensaje de error con código 404
                return response()->json(['error' => 'No se encontró ningún like para el usuario y video especificados'], 404);
            }
        } catch (\Exception $exception) {
            // Si ocurre algún error durante la búsqueda, devolver un mensaje de error con código 500
            return response()->json(['error' => 'Ocurrió un error al buscar el like'], 500);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
