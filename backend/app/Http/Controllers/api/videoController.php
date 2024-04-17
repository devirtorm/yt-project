<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\saveVideoRequest;
use App\Models\Comentario;
use App\Models\Video;
use Illuminate\Http\Request;

class videoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $videos = Video::with('user')->get();
        return response()->json(['data' => $videos], 200);
    }

    public function comentario(){
        $comentarios = Comentario::with('video')->get();
        return response()->json(['data' => $comentarios], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeVideo(saveVideoRequest $request)
    {
        $validatedData = $request->validated();
        
        try {
            // Crear una nueva instancia del modelo Video
            $video = new Video();
    
            // Llenar el modelo con los datos validados
            $video->fill($validatedData);
    
            // Guardar el video en la base de datos
            $video->save();
    
            // Devolver una respuesta JSON de éxito
            return response()->json([
                'res' => true,
                'msg' => 'Video registrado correctamente'
            ], 200);
        } catch (\Exception $e) {
            // Devolver una respuesta JSON de error en caso de excepción
            return response()->json([
                'res' => false,
                'msg' => 'Hubo un problema al guardar el video: ' . $e->getMessage()
            ], 500);
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
