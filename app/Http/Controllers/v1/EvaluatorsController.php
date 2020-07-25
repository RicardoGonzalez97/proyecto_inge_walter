<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\Evaluators;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;
class EvaluatorsController extends Controller
{
    //Evaluadores, adrian
    public function index(Request $request)
    {
        $evaluators = Evaluators::all();
        //$this->limit($evaluators, $request);
        //$evaluators = $evaluators->get();
        return response()->json([
            'data' => $evaluators,
            'total' => count($evaluators)
        ]);
    }

    public function  show($id,Request $request)
    {
        $evaluator = Evaluators::find($id);
        return response()->json([
            'data' => $evaluator,
            'total' => count($evaluator)
        ]);
    }

    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'article_id' => 'required|integer',
            'calification' => 'required',
            'observations' => 'required',
            //'files'=>'mimes:jpeg,bmp,png,pdf,docx'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $evaluator = new Evaluators();
        $evaluator->article_id = $request->input('article_id');
        $evaluator->calification = $request->input('calification');
        $evaluator->observations = $request->input('observations');
        $evaluator->status = 0;
        //$evaluators->status =$request->input('status', 1);
        $evaluator->user_id = 1;//Auth::user()->id;
        $evaluator->save();
        return response()->json([
            'data' => $evaluator,
            'total' => count($evaluator)
        ]);
    }

    public  function destroy($id, Request $request)
    {
        $evaluator = Evaluators::find($id);
        if (empty($evaluator)) {
            return response()->json([
                'total' => count($evaluator),
                'msg' => 'Evualución no localizada'
            ],422);
        }
        $evaluator->delete();
    }

    public function EvaluatorsFiles($id, Request $request)
    {
        $evaluator = Evaluators::find($id);
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:pdf,PDF,JPG,jpg,png,JPEG,jpeg,BMP,bmp,docx,xls,pptx,ppt,doc|max:8000',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $archivos = explode(",", $evaluator->files);
        if (count($archivos) < 10) {
            $file = $request->file('file');
            $nombre = str_replace(",", "_", "evaluaciónes/" . $evaluator->id . "/material/" . $evaluator->id . "__" . (round(microtime(true) * 1000) . '_' . str_random(2) . '_' . trim($file->getClientOriginalName())));
            \Storage::disk('local')->put($nombre, \File::get($file));
            array_push($archivos, $nombre);
            $evaluator->files = implode(',', $archivos);
            $evaluator->save();
            return response()->json([
                'data' => $evaluator,
                'total' => count($evaluator)
            ]);
        } else {
            return response()->json([
                'errors' => ['archivos' => "Ya tienes más de 10 archivos cargados..."]
            ], 422);
        }
        $evaluator->save();

    }
    
    public  function  update($id, Request $request)
    {
        $evaluator= Evaluators::find($id);
        $validator = Validator::make($request->all(), [
            'article_id' => 'required|integer',
            'calification' => 'required',
            'observations' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $evaluator->article_id = $request->input('article_id', $evaluator->article_id);
        $evaluator->calification = $request->input('calification', $evaluator->calification);
        $evaluator->observations = $request->input('observations', $evaluator->observations);
        $evaluator->status = $request->input('status', $evaluator->status);
        $evaluator->update();
        return response()->json([
            'data' => $evaluator,
            'total' => count($evaluator)
        ]);
    }
}
