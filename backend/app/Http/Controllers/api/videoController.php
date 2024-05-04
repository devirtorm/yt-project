<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActualizarVideoRequest;
use App\Http\Requests\saveVideoRequest;
use App\Http\Requests\SubirVideoRequest;
use App\Http\Resources\VideoResource;
use App\Models\Comentario;
use App\Models\User;
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

    public function showComentarios($videoId)
    {
    $video = Video::with(['comentarios.user']) 
                  ->findOrFail($videoId);  

    return response()->json(['comentarios' => $video->comentarios], 200);
    }

    public function comentario(){
        $comentarios = Comentario::with('video')->get();
        return response()->json(['data' => $comentarios], 200);
    }

    //Mostrar videos con estado igual a 1
    public function showActiveVideos()
    {
    $videos = Video::with('user')->where('estado', 1)->get();
    return response()->json(['data' => $videos], 200);
    }

    //Mostrar videos con estado igual a 0
    public function showInactiveVideos()
    {
    $videos = Video::where('estado', null)->get();
    return response()->json(['data' => $videos], 200);
    }

    public function videosAceptados()
    {
    $videos = Video::where('estado', 1)->get();
    return response()->json(['data' => $videos], 200);
    }

    public function VideosRechazados()
    {
    $videos = Video::where('estado', 0)->get();
    return response()->json(['data' => $videos], 200);
    }

    public function showUserVideos($userId)
    {
    
    $user = User::find($userId);
    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    // Obtiene todos los videos del usuario
    $videos = Video::where('fk_user', $userId)->get();

    return response()->json(['data' => $videos], 200);
    }   


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function upload(SubirVideoRequest $request)
    {
        $archivo = $request->file('url'); 
        $imagen = $request->file('miniatura');
    
        if (!$archivo) {
            // Manejar el caso cuando no se ha cargado un archivo de video
            return response()->json(['error' => 'No se ha cargado ningún video'], 400);
        }
    
        if (!$imagen) {
            // Manejar el caso cuando no se ha cargado un archivo de miniatura
            return response()->json(['error' => 'No se ha cargado ninguna miniatura'], 400);
        }
    
        // Generar nombres de archivo únicos
        $nombreArchivo = uniqid() . '.' . $archivo->getClientOriginalExtension();
        $nombreImagen = uniqid() . '.' . $imagen->getClientOriginalExtension();
    
        // Almacenar los archivos en una ubicación permanente en el servidor
        $archivo->storeAs('archivos/videos', $nombreArchivo, 'public');
        $imagen->storeAs('archivos/images', $nombreImagen, 'public');
    
        // Crear el registro del video en la base de datos
        Video::create([
            'url' => 'archivos/videos/' . $nombreArchivo,
            'miniatura' => 'archivos/images/' . $nombreImagen,
            'titulo' => $request->input('titulo'),
            'descripcion' => $request->input('descripcion'),
            'fk_user' => $request->input('fk_user'),
            'fk_categoria' => $request->input('fk_categoria'),
        ]);
    
        return response()->json([
            'res' => true,
            'message' => 'Video subido exitosamente'
        ]);
    }
    
    public function revisarVideos(Request $request, $id)
    {
        // Buscar el video a editar
        $video = Video::find($id);
        
        // Verificar si el video existe
        if (!$video) {
            return response()->json(['error' => 'El video no existe'], 404);
        }
    
        // Obtener los datos del request
        $estado = $request->input('estado', $video->estado);
        $revisado = $request->input('revisado', 1);
    

    
        $video->estado = $estado;
        $video->revisado = $revisado;
        $video->save();
    
        return response()->json([
            'res' => true,
            'message' => 'Video editado exitosamente'
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
    public function update(ActualizarVideoRequest $request, $id)
    {
        // Buscar el video a editar
        $video = Video::find($id);
        
        // Verificar si el video existe
        if (!$video) {
            return response()->json(['error' => 'El video no existe'], 404);
        }
    
        // Obtener los datos del request
        $titulo = $request->input('titulo');
        $descripcion = $request->input('descripcion');
        $fk_user = $request->input('fk_user');
        $fk_categoria = $request->input('fk_categoria');
    
        // Verificar si se subió un nuevo archivo de video
        if ($request->hasFile('url')) {
            $archivo = $request->file('url');
            $nombreArchivo = uniqid() . '.' . $archivo->getClientOriginalExtension();
            $archivo->storeAs('archivos/videos', $nombreArchivo, 'public');
            $video->url = 'archivos/videos/' . $nombreArchivo;
        }
    
        // Verificar si se subió una nueva miniatura
        if ($request->hasFile('miniatura')) {
            $imagen = $request->file('miniatura');
            $nombreImagen = uniqid() . '.' . $imagen->getClientOriginalExtension();
            $imagen->storeAs('archivos/images', $nombreImagen, 'public');
            $video->miniatura = 'archivos/images/' . $nombreImagen;
        }
    
        // Actualizar otros campos
        $video->titulo = $titulo;
        $video->descripcion = $descripcion;
        $video->fk_user = $fk_user;
        $video->fk_categoria = $fk_categoria;
        $video->save();
    
        return response()->json([
            'res' => true,
            'message' => 'Video editado exitosamente'
        ]);
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