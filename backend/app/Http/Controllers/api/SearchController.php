<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;

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

    $users = User::whereRaw("unaccent(lower(name)) LIKE unaccent(lower(?))", ['%' . $query . '%'])->get();
    $videos = Video::whereRaw("unaccent(lower(titulo)) LIKE unaccent(lower(?))", ['%' . $query . '%'])->get();

    return response()->json([
        'users' => $users,
        'videos' => $videos
    ], 200);
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
