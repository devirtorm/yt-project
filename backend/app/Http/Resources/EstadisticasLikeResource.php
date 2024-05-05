<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EstadisticasLikeResource extends JsonResource
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
            'like_id' => $this->fk_video,
            'likes' => $this->likes,
            'video_info' => new VideoResource($this->video) // Si tienes un recurso para el modelo Video
        ];
    }
}
