<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $table = 'surveys';
    protected $fillable =[
        'title',
        'description',
        'user_id',
        'period_id',
        'ktg_id',
        'prodi_id',
        'slug',
        'status'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function periode(){
        return $this->belongsTo(Periode::class, 'period_id');
    }

    public function kategori(){
        return $this->belongsTo(Kategori::class, 'ktg_id');
    }
    // relasi prodi
    public function prodi(){
        return $this->belongsTo(Prodi::class, 'prodi_id');
    }
    
}
