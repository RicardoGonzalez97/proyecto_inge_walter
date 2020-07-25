<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\LinesofInvestigation;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;

class linesofInvestigationController extends Controller
{
    //
    public function index(Request $request)
    {
       $linesofInvestigations = LinesofInvestigation::all();
//        $this->limit($linesofInvestigation, $request);
//        $linesofInvestigation = $linesofInvestigation->get();
        return response()->json([
            'data' => $linesofInvestigations,
            'total' => count($linesofInvestigations)
        ]);
     
    }
    
    public function  show($id, Request $request)
    {
        $linesofInvestigation = LinesofInvestigation::find($id);
        return response()->json([
            'data' => $linesofInvestigation,
            'total' => count($linesofInvestigation)
        ]);


   }
    
    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            ]);
       if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $linesofInvestigation = new LinesofInvestigation();
        $linesofInvestigation->name = $request->input('name');
        $linesofInvestigation->description = $request->input('description');
        $linesofInvestigation->status = 1; //$request->input('status', 1);
        $linesofInvestigation->user_id = Auth::user()->id;
        $linesofInvestigation->save();
        return response()->json([
            'data' => $linesofInvestigation,
            'total' => count($linesofInvestigation)
        ]);

    }
    
    public  function destroy($id, Request $request)
    {
        $linesofInvestigation = LinesofInvestigation::find($id);
        if (empty($linesofInvestigation)) {
            return response()->json([
                'total' => count($linesofInvestigation),
                'msg' => 'Lineas de investigacion no localizadas'
            ],422);
        }
        $linesofInvestigation->delete();

    }
    
    public  function  update($id, Request $request)
    {
        $linesofInvestigation = LinesofInvestigation::find($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
             ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $linesofInvestigation->name = $request->input('name', $linesofInvestigation->name);
        $linesofInvestigation->description = $request->input('description', $linesofInvestigation->description);
        $linesofInvestigation->status =$request->input('status', $linesofInvestigation->status);
        $linesofInvestigation->update();
        return response()->json([
            'data' => $linesofInvestigation,
            'total' => count($linesofInvestigation)
        ]);
      
    }
}
