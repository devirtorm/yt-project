<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Suscripciones extends Model
{
    use HasFactory;
    
    protected $table = 'suscripciones';

    protected $fillable = [
        'user_fk',
        'suscriptor_fk',
    ];

    public function usuario()
    {
       return $this->belongsTo(User::class, 'user_fk');
    }

    public function suscriptor()
    {
        return $this->belongsTo(User::class, 'suscriptor_fk');
    }
}
