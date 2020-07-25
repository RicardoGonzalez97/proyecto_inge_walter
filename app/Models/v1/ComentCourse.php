<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Model;

class ComentCourse extends Model
{
    //
    protected  $table='commentCourse';

    public function usuario(){
        return $this->hasOne('App\User', 'id','students_id');
    }
}
