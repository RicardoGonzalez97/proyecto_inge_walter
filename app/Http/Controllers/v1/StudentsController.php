<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\v1\Students;
use Validator;
use Storage;

class StudentsController extends Controller
{
    //
    public function index(Request $request)
    {
        $students = Students::where('status', 0);
        $this->limit($students, $request);
        $students = $students->get();
        return response()->json([
            'data' => $students,
            'total' => count($students)
        ]);

    }
    
    public function  show($id,Request $request)
    {
        $students = Students::find($id);
        return response()->json([
            'data' => $students,
            'total' => count($students)
        ]);
    }
    
    public  function  store($id,Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'course_id' => 'required|integer',
            'certification_url' => 'required|integer',
            'payment' => 'required',
            'target' => 'required',
            'status' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 405);
        }
        $students = new Students();
        $students->user_id = $request->input('user_id');
        $students->course_id = $request->input('course_id');
        $students->certification_url = $request->input('certification_url');
        $students->payment = $request->input('payment');
        $students->target = $request->input('target');
        $students->status = 1;
        //$students->investigationlines_id = $request->input('investigationlines_id');
        $students->save();
        return response()->json([
            'data' => $students,
            'total' => count($students)
        ]);

    }
    
    public  function destroy($id, Request $request)
    {
        $students = Students::find($id);
        if (empty($students)) {
            return response()->json([
                'errors' => null,
                'total' => count($students),
                'msg' => 'Estudiante no localizado'
            ]);
        }
        $students->delete();
    }
    
    public  function  update($id, Request $request)
    {
        $students = Students::find($id);
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'course_id' => 'required|integer',
            'certification_url' => 'required|integer',
            'payment' => 'required',
            'target' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 405);
        }
        $students->user_id = $request->input('user_id',$students->user_id);
        $students->course_id = $request->input('course_id',$students->course_id);
        $students->certification_url = $request->input('certification_url', $students->certification_url);
        $students->payment = $request->input('payment', $students->payment);
        $students->target = $request->input('target', $students->target);
        $students->status = 1;
        $students->investigationlines_id = $request->input('investigationlines_id',$students->investigationlines);
        $students->update();
        return response()->json([
            'data' => $students,
            'total' => count($students)
        ]);
    }
}