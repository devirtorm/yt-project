<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    protected $table = 'playlist';
    protected $fillable = [
        'nombre_lista',
        'descripcion',
        'estado',
        'fk_usuario'
    ];

    // Relación con la tabla de usuarios
    public function usuario()
    {
        return $this->belongsTo(User::class, 'fk_usuario', 'id');
    }

    // Relación muchos a muchos con la tabla de videos
    public function videos()
    {
        return $this->belongsToMany(Video::class, 'playlist_video', 'fk_playlist', 'fk_video')->withTimestamps();
    }
}
