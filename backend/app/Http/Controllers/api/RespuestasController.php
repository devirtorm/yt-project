<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\RespuestasComentarios;
use Illuminate\Http\Request;

class RespuestasController extends Controller
{
    public function update(Request $request, $id)
    {
        // Validar los datos de entrada
        $validatedData = $request->validate([
            'respuesta' => 'required|string|max:255',
        ]);

        // Buscar la respuesta en la base de datos
        $respuesta = RespuestasComentarios::findOrFail($id);


        // Actualizar los campos de la respuesta
        $respuesta->respuesta = $validatedData['respuesta'];

        // Guardar los cambios
        $respuesta->save();

        // Retornar una respuesta exitosa
        return response()->json([
            'message' => 'Respuesta actualizada con éxito',
            'data' => $respuesta
        ]);
    }
}

