<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Notaria extends Model
{
    protected  $table="notaria";
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    public function students(){
        return $this->belongsToMany('App\Models\v1\Students', 'course_id', 'students_id')
            ->withPivot('id','rate', 'deleted_at')
            ->withTimestamps();
    }
}
