<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\Convened;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;
use PDF;
use QrCode;
class ConvenedController extends Controller
{
    //
    public function index(Request $request)
    {
        $convened = Convened::all();
        //$convened = Convened::where('status', 0);
        //$this->limit($convened, $request);
        //$convened = $convened->get();
        return response()->json([
            'data' => $convened,
            'total' => count($convened)
        ]);
    }
    public function  show($id, Request $request)
    {
        $convened = Convened::find($id);
        return response()->json([
            'data' => $convened,
            'total' => count($convened)
        ]);
    }

    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'starting_date' => 'required',
            'end_date' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        
        $convened = new Convened();
        $convened->name = $request->input('name');
        $convened->description = $request->input('description');
        $convened->starting_date = $request->input('starting_date');
        $convened->end_date = $request->input('end_date');
        $convened->user_id = Auth::user()->id;
        $convened->status = 1;
        $convened->save();
        return response()->json([
            'data' => $convened,
            'total' => count($convened)
        ]);
    }

    public  function destroy($id, Request $request)
    {
        $convened = Convened::find($id);
        if (empty($convened)) {
            return response()->json([
                'total' => count($convened),
                'msg' => 'Convocatoría no localizada'
            ],422);
        }
        $convened->delete();

    }

    public function ConvenedFiles($id, Request $request)
    {
        $convened = Convened::find($id);
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:pdf,PDF,JPG,jpg,png,JPEG,jpeg,BMP,bmp,docx,xls,pptx,ppt,doc|max:8000',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $archivos = explode(",", $convened->files);
        if (count($archivos) < 10) {
            $file = $request->file('file');
            $nombre = str_replace(",", "_", "cunvocatoria/" . $convened->id . "/material/" . $convened->id . "__" . (round(microtime(true) * 1000) . '_' . str_random(2) . '_' . trim($file->getClientOriginalName())));
            \Storage::disk('local')->put($nombre, \File::get($file));
            array_push($archivos, $nombre);
            $convened->files = implode(',', $archivos);
            $convened->save();

            return response()->json([
                'data' => $convened,
                'total' => count($convened)
            ]);
        } else {
            return response()->json([
                'errors' => ['archivos' => "Ya tienes más de 10 archivos cargados..."]
            ], 422);
        }
        $convened->save();

    }

    public function ConvenedImages($id, Request $request)
    {
        $convened = Convened::find($id);
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:JPG,jpg,png,PNG,JPEG,jpeg,BMP,bmp|max:2000',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $file = $request->file('file');
        $nombre = str_replace(",", "_", "convocatoria/" . $convened->id . "/cover/" . $convened->id . "__" . (round(microtime(true) * 1000) . '_' . str_random(2) . '_' . trim($file->getClientOriginalName())));
        \Storage::disk('local')->put($nombre, \File::get($file));
        $convened->image = $nombre;
        $convened->save();
        return response()->json([
            'data' => $convened,
            'total' => count($convened)
        ]);
    }


    public  function  update($id, Request $request)
    {
        $convened = Convened::find($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            //'created_at' => 'required',
            'starting_date' => 'required',
            'end_date' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            //], 405);
            ], 422);
        }
        $convened->name = $request->input('name');
        $convened->description = $request->input('description', $convened->description);
        $convened->starting_date = $request->input('starting_date', $convened->starting_date);
        $convened->end_date = $request->input('end_date', $convened->end_date);
        $convened->status =$request->input('status', $convened->status);
        $convened->update();
        return response()->json([
            'data' => $convened,
            'total' => count($convened)
        ]);
    }
}
