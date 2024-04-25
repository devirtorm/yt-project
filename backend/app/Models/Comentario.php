<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    use HasFactory;
    protected $table = 'comentario';

    protected $fillable = [
        'comentario',
        'fk_video',
        'fk_user'
    ];

    public function video()
    {
        return $this->belongsTo(Video::class, 'fk_video', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'fk_user', 'id');
    }
}
