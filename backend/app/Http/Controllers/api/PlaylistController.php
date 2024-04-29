<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlaylistResource;
use App\Models\Playlist;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{

    public function index($userId)
    {
        // Buscar las playlists del usuario por su ID
        $playlists = Playlist::where('fk_usuario', $userId)->get();

        // Devolver una respuesta con las playlists encontradas
        return PlaylistResource::collection($playlists);
    }

    public function getPlaylistVideos(Playlist $playlist)
    {
        $videos = $playlist->videos; // Suponiendo que tengas una relación en tu modelo Playlist para obtener los videos asociados a una lista de reproducción

        return response()->json($videos);
    }

    public function store(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'nombre_lista' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'estado' => 'required|integer',
            'fk_usuario' => 'required|exists:users,id' // Asumiendo que 'users' es el nombre de la tabla de usuarios
        ]);

        // Crear una nueva playlist
        $playlist = Playlist::create([
            'nombre_lista' => $request->nombre_lista,
            'descripcion' => $request->descripcion,
            'estado' => $request->estado,
            'fk_usuario' => $request->fk_usuario
        ]);

        // Devolver una respuesta con la playlist creada utilizando el recurso PlaylistResource
        return response()->json([
            'message' => 'Playlist creada correctamente',
            'playlist' => new PlaylistResource($playlist)
        ], 201);
    }
}
