<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActualizarVideoRequest;
use App\Http\Requests\saveVideoRequest;
use App\Http\Requests\SubirVideoRequest;
use App\Http\Resources\VideoResource;
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
    public function upload(SubirVideoRequest $request)
{
        $archivo = $request->file('file'); 
        $imagen = $request->file('image');
    
        if (!$archivo) {
        // Manejar el caso cuando no se ha cargado un archivo
        return response()->json(['error' => 'No se ha cargado ningun Video'], 400);
        }
        if (!$imagen) {
            // Manejar el caso cuando no se ha cargado un archivo
            return response()->json(['error' => 'No se ha cargado ninguna miniatura'], 400);
            }

        $nombreArchivo = $request->input('url'); 
        $nombreImagen = $request->input('miniatura');

        $uploadPath = $archivo->storeAs('archivos/videos', $nombreArchivo, 'public');
        $uploadImagePath = $imagen->storeAs('archivos/images', $nombreImagen, 'public');

        //metodo para guardar el registro
        $subirvideo = Video::create($request->all());
    
    return response()->json([
        'res' => true,
        'message' => 'Video subido exitosamente'
    ]);
}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Video $video)
    {
        return new VideoResource($video);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ActualizarVideoRequest $request, Video $video)
    {
        $video -> update($request->all());
            return (new VideoResource($video))->additional(['msg'=> 'Video actualizado correctamente'])->response()->setStatusCode(202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Video $video)
    {
        $video->delete();
        return (new VideoResource($video))->additional(['msg'=> 'Video eliminado correctamente']);
    }
}
