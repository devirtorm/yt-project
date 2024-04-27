<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActualizarRespuestasComentariosRequest;
use App\Http\Requests\GuardarRespuestasComentarios;
use App\Http\Resources\RespuestasComentariosResource;
use App\Models\Comentario;
use App\Models\RespuestasComentarios;
use Illuminate\Http\Request;

class RespuestasComentariosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $respuestas = RespuestasComentarios::with('user')->get();
        return RespuestasComentariosResource::collection($respuestas);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GuardarRespuestasComentarios $request)
    {
        return (new RespuestasComentariosResource(RespuestasComentarios::create($request->all())))->additional(['msg'=> 'Respuesta generada correctamente']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(RespuestasComentarios $respuesta)
    {
        $respuesta->load('user');
        return new RespuestasComentariosResource($respuesta);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ActualizarRespuestasComentariosRequest $request, RespuestasComentarios $respuesta )
    {
        $respuesta -> update($request->all());
            return (new RespuestasComentariosResource($respuesta))->additional(['msg'=> 'Respuesta actualizada correctamente'])->response()->setStatusCode(202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(RespuestasComentarios $respuesta)
    {
        $respuesta->delete();
        return (new RespuestasComentariosResource($respuesta))->additional(['msg'=> 'Respuesta eliminada correctamente']);
    }
}
