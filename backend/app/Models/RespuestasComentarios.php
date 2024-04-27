<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RespuestasComentarios extends Model
{
    use HasFactory;
    protected $table = 'respuestas_comentarios';

    protected $fillable = [
        'respuesta',
        'fk_comentario',
        'fk_user'
    ];

    public function comentario()
    {
        return $this->belongsTo(Comentario::class, 'fk_comentario', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'fk_user', 'id');
    }
}
