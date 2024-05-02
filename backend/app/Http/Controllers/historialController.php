<?php

namespace App\Http\Controllers;

use App\Http\Resources\HistorialResource;
use App\Models\Historial;
use App\Models\Playlist;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class historialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'fk_user' => 'required|exists:users,id',
            'fk_video' => 'required|exists:video,id',
        ]);
    
        // Crear una nueva entrada de historial
        $historial = Historial::create([
            'fk_user' => $request->fk_user,
            'fk_video' => $request->fk_video
        ]);
    
        // Devolver una respuesta con el historial creado utilizando el recurso HistorialResource
        return response()->json([
            'message' => 'Historial registrado exitosamente',
            'historial' => new HistorialResource($historial)
        ], 201);
    }

    public function index($userId)
    {
        // Buscar las playlists del usuario por su ID
        $playlists = Historial::where('fk_user', $userId)->get();

        // Devolver una respuesta con las playlists encontradas
        return HistorialResource::collection($playlists);
    }

    public function tendencias()
    {
        // Obtener los IDs de los videos más vistos
        $videosMasVistosIds = DB::table('historial')
            ->select('fk_video', DB::raw('count(*) as vistas'))
            ->groupBy('fk_video')
            ->orderByDesc('vistas')
            ->limit(10) // Limitar a los 10 videos más vistos
            ->pluck('fk_video')
            ->toArray();
    
        // Obtener los detalles de los videos más vistos
        $videosDetalles = Video::whereIn('id', $videosMasVistosIds)->get();
    
        // Devolver una respuesta con los detalles de los videos más vistos
        return response()->json($videosDetalles);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Historial $historial)
    {
        // Devolver una respuesta con el historial utilizando el recurso HistorialResource
        return new HistorialResource($historial);
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
