<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prodi extends Model
{
    protected $table = 'prodi';

    protected $fillable = [
        'nama_prodi'
    ];

    // relasi tabel user
    public function user(){
        return $this->hasMany(User::class, 'prodi_id');
    }

    // relasi kategori
    public function kategori(){
        return $this->hasMany(Kategori::class, 'prodi_id');
    }

    // relasi periode
    public function periode(){
        return $this->hasMany(Periode::class, 'prodi_id');
    }

    // relasi survey
    public function survey(){
        return $this->hasMany(Survey::class, 'prodi_id');
    }

    // relasi responden
    public function responden(){
        return $this->hasMany(Responden::class, 'prodi_id');
    }
}
