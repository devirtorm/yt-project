<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PlaylistResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nombre_lista' => $this->nombre_lista,
            'descripcion' => $this->descripcion,
            'estado' => $this->estado,
            'fk_usuario' => $this->fk_usuario,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'usuario' => new UserResource($this->usuario), // Cargar los datos del usuario
            'videos' => VideoResource::collection($this->videos),

        ];
    }
}
