<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historial extends Model
{
    protected $table = 'historial';

    use HasFactory;

    protected $fillable = ['fk_user',
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
