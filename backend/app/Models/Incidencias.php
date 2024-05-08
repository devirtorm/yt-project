<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incidencias extends Model
{
    protected $table = 'incidencia';
    use HasFactory;

    protected $fillable = [
        'motivo',
        'fk_user',
        'fk_video'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'fk_user');
    }

    public function video()
    {
        return $this->belongsTo(Video::class, 'fk_video');
    }
}
