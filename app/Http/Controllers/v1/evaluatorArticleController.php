<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\EvaluatorArticle;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;

class evaluatorArticleController extends Controller
{
    //Evaluadores de articulos, adrian
    public function index(Request $request)
    {
        $evaluatorarticles = EvaluatorArticle::all();
        //$this->limit($evaluatorarticles, $request);
        //$evaluatorarticles = $evaluatorarticles->get();
        return response()->json([
            'data' => $evaluatorarticles,
            'total' => count($evaluatorarticles)
        ]);
    }

    public function  show($id,Request $request)
    {
        $evaluatorarticle = EvaluatorArticle::find($id);
        return response()->json([
            'data' => $evaluatorarticle,
            'total' => count($evaluatorarticle)
        ]);
    }

    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'abstract' => 'required',
            'cv' => 'required',
            'email' => 'required',
            'phone' => 'required|numeric',
            'web' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $evaluatorarticle = new EvaluatorArticle();
        $evaluatorarticle->name = $request->input('name');
        $evaluatorarticle->abstract = $request->input('abstract');
        $evaluatorarticle->cv = $request->input('cv');
        $evaluatorarticle->email = $request->input('email');
        $evaluatorarticle->phone = $request->input('phone');
        $evaluatorarticle->web = $request->input('web');
        $evaluatorarticle->status = 0;
        //$evaluators->status =$request->input('status', 1);
        $evaluatorarticle->user_id = 1;//Auth::user()->id;
        $evaluatorarticle->save();
        return response()->json([
            'data' => $evaluatorarticle,
            'total' => count($evaluatorarticle)
        ]);
    }

    public function destroy($id, Request $request)
    {
        $evaluatorarticle = Course::find($id);
        if (empty($evaluatorarticle)) {
            return response()->json([
                //'errors' => null,
                'total' => count($evaluatorarticle),
                'msg' => 'Evaluador de artículo no localizado, no localizado'
            ], 422);
        }
        $evaluatorarticle->delete();
    }

    public function EvaluatorArticleImages($id, Request $request)
    {
        $evaluatorarticle = EvaluatorArticle::find($id);
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:JPG,jpg,png,PNG,JPEG,jpeg,BMP,bmp|max:2000',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $file = $request->file('file');
        $nombre = str_replace(",", "_", "cursos/" . $evaluatorarticle->id . "/cover/" . $evaluatorarticle->id . "__" . (round(microtime(true) * 1000) . '_' . str_random(2) . '_' . trim($file->getClientOriginalName())));
        \Storage::disk('local')->put($nombre, \File::get($file));
        $evaluatorarticle->image = $nombre;
        $evaluatorarticle->save();
        return response()->json([
            'data' => $evaluatorarticle,
            'total' => count($evaluatorarticle)
        ]);
    }
    
    public function update($id, Request $request)
    {
        $evaluatorarticle = EvaluatorArticle::find($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'abstract' => 'required',
            'cv' => 'required',
            'email' => 'required',
            'phone' => 'required|numeric',
            'web' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $evaluatorarticle->name = $request->input('name', $evaluatorarticle->name);
        $evaluatorarticle->abstract = $request->input('abstract', $evaluatorarticle->abstract);
        $evaluatorarticle->cv = $request->input('cv', $evaluatorarticle->cv);
        $evaluatorarticle->email = $request->input('email', $evaluatorarticle->email);
        $evaluatorarticle->phone = $request->input('phone', $evaluatorarticle->phone);
        $evaluatorarticle->web = $request->input('web', $evaluatorarticle->web);
        $evaluatorarticle->status = $request->input('status', $evaluatorarticle->status);
        $evaluatorarticle->update();
        return response()->json([
            'data' => $evaluatorarticle,
            'total' => count($evaluatorarticle)
        ]);
    }

}
