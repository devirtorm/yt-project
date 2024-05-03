<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HistorialResource extends JsonResource
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
            'user' => new UserResource($this->user), // Asumiendo que tienes definido el recurso UserResource
            'video' => new VideoResource($this->video), // Asumiendo que tienes definido el recurso VideoResource
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
