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
   public function searchUsers(Request $request)
   {
    $query = $request->input('query');
   
    if (trim($query) === '') {
        return response()->json(['data' => []], 200);
    }

    // Asegura que la búsqueda sea insensible a mayúsculas y minúsculas
    $user = User::whereRaw('LOWER(name) LIKE LOWER(?)', ['%' . $query . '%'])->get();

    return response()->json(['data' => $user], 200);
   }

   // Nuevo método para buscar videos por título
   public function searchVideos(Request $request)
   {
       $query = $request->input('query');
   
       if (trim($query) === '') {
           return response()->json(['data' => []], 200);
       }
   
       // Asegura que la búsqueda sea insensible a mayúsculas y minúsculas
       $videos = Video::whereRaw('LOWER(titulo) LIKE LOWER(?)', ['%' . $query . '%'])->get();
   
       return response()->json(['data' => $videos], 200);
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
