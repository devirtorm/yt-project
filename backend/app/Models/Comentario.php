<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    use HasFactory;
    protected $table = 'comentario';

    protected $fillable=[
        'comentario',
        'fk_user',
        'fk_video'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'fk_user', 'id');
    }

    public function video()
    {
        return $this->belongsTo(Video::class, 'fk_video', 'id');
    }
}
