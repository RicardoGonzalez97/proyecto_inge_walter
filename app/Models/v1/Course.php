<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Course extends Model
{

    protected  $table="course";
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    public function author()
    {
        return $this->hasOne('App\User','id','user_id');
    }
    public function categoryCourse()
    {
        return $this->hasOne('App\Models\v1\categoryCourse','id','categoryCourse_id');
    }
    public function typeCourse(){
        return $this->hasOne('App\Models\v1\typeCourse','id','typeCourse_id');
    }
    public function students(){
        return $this->belongsToMany('App\Models\v1\Students', 'commentCourse', 'course_id', 'students_id')
                    ->withPivot('id','rate', 'comment', 'deleted_at')
                    ->withTimestamps();
    }
}
