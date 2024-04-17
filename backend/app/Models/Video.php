<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $table = 'video';

    protected $fillable = [
        'titulo',
        'descripcion',
        'url',
        'fk_categoria',
        'fk_user',
        'estado',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'fk_user', 'id');
    }
}
