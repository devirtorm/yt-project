<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RespuestasComentarios extends Model
{
    use HasFactory;

    protected $table = 'respuestas_comentarios';

    protected $fillable = [
        'id',
        'respuesta',
        'fk_comentario',
        'fk_user',
        'fk_respuesta_padre' // Asegúrate de que esta columna exista en la base de datos
    ];

    public function comentario()
    {
        return $this->belongsTo(Comentario::class, 'fk_comentario', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'fk_user', 'id');
    }

    public function respuestaPadre()
    {
        return $this->belongsTo(RespuestasComentarios::class, 'fk_respuesta_padre');
    }

    public function respuestas()
    {
        return $this->hasMany(RespuestasComentarios::class, 'fk_respuesta_padre');
    }
}
