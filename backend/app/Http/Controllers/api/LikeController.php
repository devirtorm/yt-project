<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
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
    public function toggleLike(Request $request, $videoId)
    {
        $user = $request->user();
    
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }
    
        $userId = $user->id;
        $like = Like::where('fk_video', $videoId)->where('fk_usuario', $userId)->first();
    
        if ($like) {
            $like->delete();  // Elimina el like existente
            return response()->json([
                'message' => 'Like removed successfully',  // Mensaje de que el like fue eliminado
                'liked' => false  // Estado de like
            ]);
        } else {
            Like::create([
                'like' => true,
                'fk_usuario' => $userId,
                'fk_video' => $videoId,
                'fecha_like' => now()
            ]);  // Crea un nuevo like
            return response()->json([
                'message' => 'Like added successfully',  // Mensaje de que se añadió el like
                'liked' => true  // Estado de like
            ]);
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
