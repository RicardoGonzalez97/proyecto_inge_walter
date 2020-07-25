<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\Reviews;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;

class ReviewsController extends Controller
{
    //cambios daniel, adrian
    public function index(Request $request)
    {
        $reviews = Reviews::where('status', 0);
        $this->limit($reviews, $request);
        $reviews = $reviews->get();
        return response()->json([
            'data' => $reviews,
            'total' => count($reviews)
        ]);
    }

    
    public function  show($id,Request $request)
    {
        $reviews = Reviews::find($id);
        return response()->json([
            'data' => $reviews,
            'total' => count($reviews)
        ]);
    }
    
    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required',
            'like' => 'required',
            'students_id' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 405);
        }
        $reviews = new Reviews();
        $reviews->description = $request->input('description');
        $reviews->like = $request->input('like');
        $reviews->students_id = $request->input('students_id');
        $reviews->status = 0;
        $reviews->user_id = 1;//Auth::user()->id;
        $reviews->save();
        return response()->json([
            'data' => $reviews,
            'total' => count($reviews)
        ]);
    }
    
    public  function destroy($id, Request $request)
    {
        $reviews = Reviews::find($id);
        if (empty($reviews)) {
            return response()->json([
                'errors' => null,
                'total' => count($reviews),
                'msg' => 'Reviews no localizado'
            ]);
        }
        $reviews->delete();
    }

    public  function  update($id, Request $request)
    {
        $reviews = Reviews::find($id);
        $validator = Validator::make($request->all(), [
            'description' => 'required',
            'like' => 'required',
            'students_id' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 405);
        }
        $reviews->description = $request->input('description', $reviews->description);
        $reviews->like = $request->input('like', $reviews->like);
        $reviews->students_id = $request->input('students_id', $reviews->students_id);
        $reviews->status = 0;
        $reviews->update();
        return response()->json([
            'data' => $reviews,
            'total' => count($reviews)
        ]);
    }
}