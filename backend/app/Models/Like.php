<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $table = 'likes';
    protected $fillable = ['like', 'fk_usuario', 'fk_video', 'fecha_like'];

    public function user()
    {
        return $this->belongsTo(User::class, 'fk_usuario');
    }

    public function video()
    {
        return $this->belongsTo(Video::class, 'fk_video');
    }
}
