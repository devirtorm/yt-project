<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
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
        'titulo' => ucfirst($this->titulo),
        'descripcion' => ucfirst($this->descripcion),
        'url' => asset('storage/archivos/videos/' . $this->url), // Asegúrate de que la ruta sea accesible y correcta
        'miniatura' => asset('storage/archivos/images/' . $this->miniatura), // Asegúrate de que la ruta sea accesible y correcta
        'estado' => $this->estado,
        'categoria' => new CategoriaResource($this->whenLoaded('categoria')),
        'usuario' => new UserResource($this->whenLoaded('user')),
        'fecha_creado' => optional($this->created_at)->format('d-m-Y'),
        'fecha_modificado' => optional($this->updated_at)->format('d-m-Y'),
        // Más datos que necesites enviar al frontend
    ];
}
}
