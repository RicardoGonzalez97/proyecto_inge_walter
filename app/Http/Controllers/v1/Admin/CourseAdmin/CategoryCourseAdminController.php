<?php

namespace App\Http\Controllers\v1\Admin\CourseAdmin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\CategoryCourse;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\v1\Controller;
use Validator;
use Storage;

class CategoryCourseAdminController extends Controller
{


    public function index(Request $request)
    {
        $categoryCourses = CategoryCourse::all();
        //$categoryCourses = CategoryCourse::where('status', 0);
        //$this->limit($categoryCourses, $request);
        //$categoryCourses = $categoryCourses->get();
        return response()->json([
            'data' => $categoryCourses,
            'total' => count($categoryCourses)
        ]);
    }


    public function  show($id, Request $request)
    {
        $categoryCourse = CategoryCourse::find($id);
        return response()->json([
            'data' => $categoryCourse,
            'total' => count($categoryCourse)
        ]);
    }


    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $categoryCourse = new CategoryCourse();
        $categoryCourse->name = $request->input('name');
        $categoryCourse->description = $request->input('description');
        $categoryCourse->user_id = Auth::user()->id;
        $categoryCourse->status = 1;
        // $categoryCourse->status =$request->input('status', 1);
        $categoryCourse->save();
        return response()->json([
            'data' => $categoryCourse,
            'total' => count($categoryCourse)
        ]);
    }


    public  function destroy($id, Request $request)
    {
        $categoryCourse = CategoryCourse::find($id);
        if (empty($categoryCourse)) {
            return response()->json([
                'total' => count($categoryCourse),
                'msg' => 'Categoría de curso no localizada'
            ],422);
        }
        $categoryCourse->delete();

    }


    public  function  update($id, Request $request)
    {
        $categoryCourse = CategoryCourse::find($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
                //], 405);
            ], 422);
        }

        $categoryCourse->name = $request->input('name', $categoryCourse->name);
        $categoryCourse->description = $request->input('description', $categoryCourse->description);
        $categoryCourse->status =$request->input('status', $categoryCourse->status);
        $categoryCourse->update();
        return response()->json([
            'data' => $categoryCourse,
            'total' => count($categoryCourse)
        ]);
    }
}




