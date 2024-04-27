<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RespuestasComentariosResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return[
            'id' => $this->id,
            'respuesta' => ucfirst($this->respuesta),
            'fk_user' => $this->fk_user,
            'usuario' => $this->whenLoaded('user'),
            'fk_comentario' => $this->fk_comentario
        ];
    }
}
