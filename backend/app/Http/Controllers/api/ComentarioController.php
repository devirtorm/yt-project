<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActualizarComentarioRequest;
use App\Http\Requests\ComentarioRequest;
use App\Http\Resources\ComentarioResource;
use App\Models\Comentario;
use Illuminate\Http\Request;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ComentarioResource::collection(Comentario::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ComentarioRequest $request)
    {
        return (new ComentarioResource(Comentario::create($request->all())))->additional(['msg'=> 'Comentario realizado correctamente']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Comentario $comentario)
    {
        return new ComentarioResource($comentario);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ActualizarComentarioRequest $request, Comentario $comentario)
    {
        $comentario -> update($request->all());
            return (new ComentarioResource($comentario))->additional(['msg'=> 'Comentario actualizado correctamente'])->response()->setStatusCode(202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comentario $comentario)
    {
        $comentario->delete();
        return (new ComentarioResource($comentario))->additional(['msg'=> 'Comentario eliminado correctamente']);
    }
}
