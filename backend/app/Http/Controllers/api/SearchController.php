<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SuscripcionResource;
use App\Models\Suscripciones;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
   // Método existente para buscar usuarios
   public function searchAll(Request $request)
   {
       $query = $request->input('query');
   
       if (trim($query) === '') {
           return response()->json(['data' => []], 200); // Retorna vacío si no hay entrada
       }
   
       $users = User::withCount('suscriptores')->whereRaw("unaccent(lower(name)) LIKE unaccent(lower(?))", ['%' . $query . '%'])->get();
   
       $videos = Video::with('user')->withCount('vistas')->whereRaw("unaccent(lower(titulo)) LIKE unaccent(lower(?))", ['%' . $query . '%'])->get();
   
       return response()->json([
           'users' => $users,
           'videos' => $videos
       ], 200);
   }

public function topVideos()
{
    // Consultar los 10 videos más vistos
    $topVideos = Suscripciones::groupBy('fk_video')
                    ->select('fk_video', DB::raw('count(*) as views'))
                    ->orderByDesc('suscripciones')
                    ->limit(10)
                    ->get();

    // Para cada video, obtener la información del video a través de la relación
    foreach ($topVideos as $video) {
        $video->load('video'); // Cargar la relación 'video' para obtener la información del video
    }

    // Devolver los 10 videos más vistos como recursos HistorialResource
    return SuscripcionResource::collection($topVideos);
}
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
