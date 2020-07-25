<?php

namespace App\Http\Controllers\v1;

use App\Models\v1\ComentCourse;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CommentCourseController extends Controller
{
    public function index(Request $request)
    {
        $comments = ComentCourse::where('course_id', $request->input('course_id'))->with('usuario');
        $this->limit($comments, $request);
        $comments = $comments->get();
        return response()->json(['data' => $comments]);

    }

    public function store(Request $request)
    {
        $comment = new ComentCourse();
        $comment->students_id = Auth::user()->id;
        $comment->comment = $request->input('comment');
        $comment->course_id = $request->input('course_id');
        $comment->rate=$request->input('rate',0);
        $comment->save();


        $comment = ComentCourse::where('id', $comment->id)->with('usuario')->first();
        return response()->json(['data' => $comment]);


    }
}
