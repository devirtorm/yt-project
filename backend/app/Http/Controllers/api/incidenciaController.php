<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GuardarIncidenciaRequest;
use App\Http\Resources\IncidenciaResource;
use App\Models\Incidencias;
use Illuminate\Http\Request;

class incidenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showIncidenciasPorVideoYUsuario($userId, $videoId)
    {
        $incidencias = Incidencias::where('fk_user', $userId)
                                  ->where('fk_video', $videoId)
                                  ->get();

        return response()->json($incidencias);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GuardarIncidenciaRequest $request)
    {
        return (new IncidenciaResource(Incidencias::create($request->all())))->additional(['msg'=> 'Incidencia guardada correctamente']);
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
