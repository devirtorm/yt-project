<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ComentarioResource extends JsonResource
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
            'comentario' => ucfirst($this->comentario),
            "fk_user"=> $this->fk_user,
            "fk_video"=> $this->fk_video,
            'fecha_creado' => optional($this->created_at)->format('d-m-Y'),
            'fecha_modificado' => optional($this->updated_at)->format('d-m-Y')
        ];
    }
}
