<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

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
            'url' => Storage::url('storage/' . $this->url),
            'miniatura' => Storage::url('storage/' . $this->miniatura),
            'estado' => $this->estado,
            'fk_user' => $this->fk_user,
            'fk_categoria' => $this->fk_categoria,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => $this->user
        ];
        
        
        
    }
}
