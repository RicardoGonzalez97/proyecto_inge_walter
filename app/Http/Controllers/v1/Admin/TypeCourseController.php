<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\TypeCourse;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;
class TypeCourseController extends Controller
{
    //
    public function index(Request $request)
    {
        $typeCourse = TypeCourse::all();
        //$this->limit($typeCourse, $request);
        //$typeCourse = $typeCourse->get();
        return response()->json([
            'data' => $typeCourse,
            'total' => count($typeCourse)
        ]);

    }
    
    public function  show($id, Request $request)
    {
   $typeCourse = TypeCourse::find($id);
        return response()->json([
            'data' => $typeCourse,
            'total' => count($typeCourse)
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
        $typeCourse = new TypeCourse();
        $typeCourse->name = $request->input('name');
        $typeCourse->description = $request->input('description');
        //$typeCourse->user_id = Auth::user()->id;
        $typeCourse->user_id = Auth::user()->id;
        $typeCourse->status = 1;
        $typeCourse->save();
        return response()->json([
            'data' => $typeCourse,
            'total' => count($typeCourse)
        ]);
        
    }
    
    public  function destroy($id, Request $request){
        $typeCourse = TypeCourse::find($id);
        if (empty($typeCourse)) {
            return response()->json([
                'total' => count($typeCourse),
                'msg' => 'Tipo de curso no localizado'
            ],422);
        }
        $typeCourse->delete();

    }
    public  function  update($id, Request $request){
        $typeCourse = TypeCourse::find($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required'
            ]);
       if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        
        $typeCourse->name = $request->input('name', $typeCourse->name);
        $typeCourse->description = $request->input('description', $typeCourse->description);
        $typeCourse->status =$request->input('status', $typeCourse->status);
        $typeCourse->update();
        return response()->json([
            'data' => $typeCourse,
            'total' => count($typeCourse)
        ]);

    }
}
