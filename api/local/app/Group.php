<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    public function owner(){
        $this->hasOne('App\User');
    }
    public function members(){
        $this->belongsToMany('App\User');
    }
}
