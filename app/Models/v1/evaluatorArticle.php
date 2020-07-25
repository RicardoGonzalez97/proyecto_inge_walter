<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class EvaluatorArticle extends Model
{
    //
    protected  $table="evaluatorArticle";
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
}