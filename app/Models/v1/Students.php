<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
//use App\Model\Students;

class Students extends Model
{
    //
    protected  $table="students";
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    public function courses(){
        return $this->belongsToMany('App\Models\v1\Course', 'commentCourse', 'students_id', 'course_id')
                    ->withPivot('id','reaction', 'comment', 'deleted_at')
                    ->withTimestamps();
    }
    public function usuario(){
        return $this->hasOne('App\User', 'id','user_id');
    }
}