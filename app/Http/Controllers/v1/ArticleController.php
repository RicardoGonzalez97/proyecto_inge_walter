<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\Article;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;
use PDF;
use QrCode;
class ArticleController extends Controller
{


    public function index(Request $request)
    {
        $articles = Article::all();
        //$this->limit($articles, $request);
        //$articles = $articles->get();
        return response()->json([
            'data' => $articles,
            'total' => count($articles)
        ]);
    }
    public function getConstancia($id,Request $request){

        $data=['name'=>"Daniel Eduardo Pérez Ramírez",'key'=>str_random(110),"course"=>"Revista 2016"];
        $pdf = \PDF::loadView('pdf.revista',$data);
        //return view("pdf.revista",$data);
        return $pdf->setPaper('a4', 'landscape')->stream('certificado.pdf');
    }

    /**
     * @param Request $request
     * Obtiene un articulo en especifico /GET
     */
    public function show($id, Request $request)
    {
        $articles = Article::find($id);
        return response()->json([
            'data' => $articles,
            'total' => count($articles)
        ]);
    }

    /**
     * @param Request $request
     * Crea un articulo  /POST
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'keywords' => 'required',
            'summary' => 'required',
            'abstract' => 'required',
            'content' => 'required',
            'author' => 'required',
            'convened_id' => 'required',
            'linesofInvestigation_id' => 'required'
            //'files'=>'mimes:jpeg,bmp,png,pdf,docx'
        ]);
        
       if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        
        $article = new Article();
        $article->name = $request->input('name');
        $article->keywords = $request->input('keywords');
        $article->summary = $request->input('summary');
        $article->abstract = $request->input('abstract');
        $article->content = $request->input('content');
        $article->author = $request->input('author');
        $article->isssn = 0;//$request->input('isssn');
        $article->convened_id = $request->input('convened_id');
        $article->linesofInvestigation_id = $request->input('linesofInvestigation_id');
        $article->user_id = Auth::user()->id;
        $article->status = 1;
        $article->save();
        return response()->json([
            'data' => $article,
            'total' => count($article)
        ]);
    }

    /**
     * @param $id
     * @param Request $request
     * Elimina un articulo /DELETE
     */
    public function destroy($id, Request $request)
    {
        $article = Article::find($id);
        if (empty($article)) {
            return response()->json([
                'total' => count($article),
                'msg' => 'Articulo no localizado'
            ],422);
        }
        $article->delete();
    }

    /**
     * @param $id
     * @param Request $request
     * Actualiza un articulo /UPDATE
     */


    public function ArticleFiles($id, Request $request)
    {
        $article = Article::find($id);
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:pdf,PDF,JPG,jpg,png,JPEG,jpeg,BMP,bmp,docx,xls,pptx,ppt,doc|max:8000',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $archivos = explode(",", $article->files);
        if (count($archivos) < 10) {
            $file = $request->file('file');
            $nombre = str_replace(",", "_", "articulo/" . $article->id . "/material/" . $article->id . "__" . (round(microtime(true) * 1000) . '_' . str_random(2) . '_' . trim($file->getClientOriginalName())));
            \Storage::disk('local')->put($nombre, \File::get($file));
            array_push($archivos, $nombre);
            $article->files = implode(',', $archivos);
            $article->save();

            return response()->json([
                'data' => $article,
                'total' => count($article)
            ]);
        } else {
            return response()->json([
                'errors' => ['archivos' => "Ya tienes más de 10 archivos cargados..."]
            ], 422);
        }
        $article->save();

    }

    public function update($id, Request $request)
    {

        $article = Article::find($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'keywords' => 'required',
            'summary' => 'required',
            'abstract' => 'required',
            'content' => 'required',
            'author' => 'required',
            'convened_id' => 'required|integer',
            'linesofInvestigation_id' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $article->name = $request->input('name', $article->name);
        $article->keywords = $request->input('keywords', $article->keywords);
        $article->summary = $request->input('summary', $article->summary);
        $article->abstract = $request->input('abstract', $article->abstract);
        $article->content = $request->input('content', $article->content);
        $article->author = $request->input('author', $article->author);
        $article->isssn = $request->input('isssn', $article->isssn);
        $article->status = $request->input('status', $article->status);
        $article->convened_id = $request->input('convened_id', $article->convened_id);
        $article->linesofInvestigation_id = $request->input('linesofInvestigation_id', $article->linesofInvestigation_id);
        $article->update();
        return response()->json([
            'data' => $article,
            'total' => count($article)
        ]);

    }
}
