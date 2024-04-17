<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $table = 'video';
       public function comentarios()
    {
        return $this->hasMany(Comentario::class, 'fk_video', 'id');
    }
}
