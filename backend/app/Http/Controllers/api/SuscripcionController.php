<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SuscripcionResource;
use App\Models\Suscripciones;
use Illuminate\Http\Request;

class SuscripcionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function countSuscriptores($usuarioId)
    {
        // Contar cuántos suscriptores tiene el usuario
        $cantidadSuscriptores = Suscripciones::where('user_fk', $usuarioId)->count();

        return response()->json(['cantidad_suscriptores' => $cantidadSuscriptores]);
    }


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
            'user_fk' => 'required|exists:users,id',
            'suscriptor_fk' => 'required|exists:users,id',
        ]);

        // Verificar si ya existe la suscripción
        $existeSuscripcion = Suscripciones::where('user_fk', $request->user_fk)
            ->where('suscriptor_fk', $request->suscriptor_fk)
            ->exists();

        if ($existeSuscripcion) {
            return response()->json(['message' => 'La suscripción ya existe.'], 400);
        }

        // Crear una nueva suscripción
        $suscripcion = Suscripciones::create([
            'user_fk' => $request->user_fk,
            'suscriptor_fk' => $request->suscriptor_fk,
        ]);

        return response()->json(['message' => 'Suscripción creada correctamente'], 201);
    }



    public function suscripcionesUsuario($id)
    {
        // Obtener las suscripciones del usuario con los detalles del usuario y suscriptor
        $suscripciones = Suscripciones::with(['usuario', 'suscriptor'])
            ->where('user_fk', $id)
            ->get();
    
        return response()->json($suscripciones);
    }
    

    public function buscarRelacion($usuarioId, $suscriptorId)
    {
        // Buscar la suscripción
        $suscripcion = Suscripciones::where('user_fk', $usuarioId)
            ->where('suscriptor_fk', $suscriptorId)
            ->first();
    
        // Devolver la respuesta utilizando el recurso SuscripcionResource
        return new SuscripcionResource($suscripcion);
    }

    public function eliminarRelacion($usuarioId, $suscriptorId)
    {
        // Buscar la suscripción
        $suscripcion = Suscripciones::where('user_fk', $usuarioId)
            ->where('suscriptor_fk', $suscriptorId)
            ->first();

        // Verificar si la suscripción existe
        if (!$suscripcion) {
            return response()->json(['message' => 'La suscripción no existe.'], 404);
        }

        // Eliminar la suscripción
        $suscripcion->delete();

        return response()->json(['message' => 'Suscripción eliminada correctamente.']);
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
        // Buscar la suscripción por su ID
        $suscripcion = Suscripciones::find($id);

        // Verificar si la suscripción existe
        if (!$suscripcion) {
            return response()->json(['message' => 'La suscripción no existe.'], 404);
        }

        // Eliminar la suscripción
        $suscripcion->delete();

        return response()->json(['message' => 'Suscripción eliminada correctamente.']);
    }
}
