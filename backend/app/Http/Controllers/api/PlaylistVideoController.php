<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlaylistVideoResource;
use App\Models\Playlist_video;
use Illuminate\Http\Request;

class PlaylistVideoController extends Controller
{
    public function store(Request $request)
    {
        // Valida los datos recibidos del request
        $request->validate([
            'fk_playlist' => 'required|integer',
            'fk_video' => 'required|integer'
        ]);

        // Crea un nuevo registro en la tabla playlist_video
        $playlistVideo = Playlist_video::create([
            'fk_playlist' => $request->fk_playlist,
            'fk_video' => $request->fk_video
        ]);

        // Retorna una respuesta de éxito con los datos del recurso PlaylistVideoResource
        return new PlaylistVideoResource($playlistVideo);
    }
}
