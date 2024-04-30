<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActualizarUserRequest;
use App\Http\Requests\SaveUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UserResource::collection(User::all());

        // Pasar los usuarios a la vista para ser renderizados
    }

    //Muestra videos de un usuario especifico
    public function videos($id)
    {
        $user = User::with('videos')->find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json($user->videos);
    }

    //Muestra los videos que tienen estado 1 de cierto usuario
    public function videosActivos($id)
    {
        $user = User::with(['videos' => function($query) {
            $query->where('estado', 1);
        }])->find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json($user->videos);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SaveUserRequest $request)
    {
        $validatedData = $request->validated();
    
        try {
            $user = new User();
            $user->fill($validatedData);
            $user->password = bcrypt($request->password);
            $user->save();
    
            $user->roles()->attach($request->roles);
    
            return response()->json([
                'res' => true,
                'msg' => 'usuario registrado correctamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'res' => false,
                'msg' => 'Hubo un problema al guardar usuario: ' . $e->getMessage()
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
        return new UserResource(User::find($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ActualizarUserRequest $request, $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['error' => 'Usuario no encontrado'], 404);
    }

    $user->fill($request->except(['password'])); // Excluye la contraseña del relleno automático

    if ($request->hasFile('foto')) {
        $foto = $request->file('foto');
        $nombreFoto = uniqid() . '.' . $foto->getClientOriginalExtension();
        $foto->storeAs('archivos/images', $nombreFoto, 'public');
        $user->foto = 'archivos/images/' . $nombreFoto;
    }

    // Verifica si la contraseña ha sido proporcionada y no está vacía
    if ($request->filled('password')) {
        $user->password = bcrypt($request->password);
    }

    $user->save();

    return response()->json([
        'res' => true,
        'message' => 'Información del usuario actualizada correctamente',
        'data' => $user
    ]);
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
