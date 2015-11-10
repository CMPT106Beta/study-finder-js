<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = ['user_id','description','startTime','capacity','course','location'];
    public function owner(){
        $this->hasOne('App\User');
    }
    public function members(){
        $this->belongsToMany('App\User');
    }
}
