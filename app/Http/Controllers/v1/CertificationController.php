<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\Certification;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;

class CertificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $certificacions = Certification::all();
        return response()->json([
            'data' => $certificacions,
            'total' => count($certificacions)
        ]);
    }

    public function  show($id, Request $request)
    {
        $certification = Certification::find($id);
        return response()->json([
            'data' => $certification,
            'total' => count($certification)
        ]);
    }

    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'institution' => 'required',
            'name' => 'required',
            'date' => 'required',
            'finish_date' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $certification = new Certification();
        $certification->institution = $request->input('institution');
        $certification->name = $request->input('name');
        $certification->date = $request->input('date');
        $certification->finish_date = $request->input('finish_date');
        $certification->user_id = Auth::user()->id;
        $certification->status = 1;
        $certification->save();
        return response()->json([
            'data' => $certification,
            'total' => count($certification)
        ]);
    }

    public  function destroy($id, Request $request)
    {
        $certification = Title::find($id);
        if (empty($certification)) {
            return response()->json([
                'total' => count($certification),
                'msg' => 'Certificado no localizado'
            ],422);
        }
        $certification->delete();
    }

    public function CertificationFiles($id, Request $request)
    {
        $certification = Certification::find($id);
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:pdf,PDF,JPG,jpg,png,JPEG,jpeg,BMP,bmp,docx,xls,pptx,ppt,doc|max:8000',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $archivos = explode(",", $certification->files);
        if (count($archivos) < 1) {
            $file = $request->file('file');
            $nombre = str_replace(",", "_", "articulo/" . $certification->id . "/material/" . $certification->id . "__" . (round(microtime(true) * 1000) . '_' . str_random(2) . '_' . trim($file->getClientOriginalName())));
            \Storage::disk('local')->put($nombre, \File::get($file));
            array_push($archivos, $nombre);
            $certification->files = implode(',', $archivos);
            $certification->save();

            return response()->json([
                'data' => $certification,
                'total' => count($certification)
            ]);
        } else {
            return response()->json([
                'errors' => ['archivos' => "Ya tienes más de 1 archivo cargado..."]
            ], 422);
        }
        $certification->save();
    }

    public  function  update($id, Request $request)
    {
        $certification = Certification::find($id);
        $validator = Validator::make($request->all(), [
            'institution' => 'required',
            'name' => 'required',
            'date' => 'required',
            'finish_date' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
                //], 405);
            ], 422);
        }

        $certification->institution = $request->input('institution', $certification->institution);
        $certification->name = $request->input('name', $certification->name);
        $certification->date = $request->input('date', $certification->date);
        $certification->finish_date = $request->input('finish_date', $certification->finish_date);
        $certification->status =$request->input('status', $certification->status);
        $certification->update();
        return response()->json([
            'data' => $certification,
            'total' => count($certification)
        ]);
    }
}
