<?php

namespace App\Http\Controllers;

use App\Http\Resources\HistorialResource;
use App\Models\Historial;
use App\Models\Playlist;
use Illuminate\Http\Request;

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
