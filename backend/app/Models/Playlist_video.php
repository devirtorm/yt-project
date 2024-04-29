<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlist_video extends Model
{
    protected $table = 'playlist_video';
    protected $fillable = [
        'fk_playlist',
        'fk_video'
    ];

    // Relación con la tabla de playlist
    public function playlist()
    {
        return $this->belongsTo(Playlist::class, 'fk_playlist', 'id');
    }

    // Relación con la tabla de video
    public function video()
    {
        return $this->belongsTo(Video::class, 'fk_video', 'id');
    }
}
