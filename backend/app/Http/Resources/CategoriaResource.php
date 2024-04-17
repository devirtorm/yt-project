<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoriaResource extends JsonResource
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
            'identificador' => $this->id,
            'nombre_categoria' => ucfirst($this->nombre_categoria),
            'descripcion' => ucfirst($this->descripcion),
            'fecha_creado' => optional($this->created_at)->format('d-m-Y'),
            'fecha_modificado' => optional($this->updated_at)->format('d-m-Y')
        ];
    }
}
