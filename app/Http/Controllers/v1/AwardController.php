<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\Award;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;

class AwardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $awards = Award::all();
        return response()->json([
            'data' => $awards,
            'total' => count($awards)
        ]);
    }

    public function  show($id, Request $request)
    {
        $award = Award::find($id);
        return response()->json([
            'data' => $award,
            'total' => count($award)
        ]);
    }

    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'reason' => 'required',
            'institution' => 'required',
            'date' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $award = new Award();
        $award->name = $request->input('name');
        $award->reason = $request->input('reason');
        $award->institution = $request->input('institution');
        $award->date = $request->input('date');
        $award->user_id = Auth::user()->id;
        $award->status = 1;
        $award->save();
        return response()->json([
            'data' => $award,
            'total' => count($award)
        ]);
    }

    public  function destroy($id, Request $request)
    {
        $award = Award::find($id);
        if (empty($award)) {
            return response()->json([
                'total' => count($award),
                'msg' => 'Premio no localizado'
            ],422);
        }
        $award->delete();
    }

    public function AwardFiles($id, Request $request)
    {
        $award = Award::find($id);
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:pdf,PDF,JPG,jpg,png,JPEG,jpeg,BMP,bmp,docx,xls,pptx,ppt,doc|max:8000',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $archivos = explode(",", $award->files);
        if (count($archivos) < 10) {
            $file = $request->file('file');
            $nombre = str_replace(",", "_", "articulo/" . $award->id . "/material/" . $award->id . "__" . (round(microtime(true) * 1000) . '_' . str_random(2) . '_' . trim($file->getClientOriginalName())));
            \Storage::disk('local')->put($nombre, \File::get($file));
            array_push($archivos, $nombre);
            $award->files = implode(',', $archivos);
            $award->save();

            return response()->json([
                'data' => $award,
                'total' => count($award)
            ]);
        } else {
            return response()->json([
                'errors' => ['archivos' => "Ya tienes más de 10 archivo cargado..."]
            ], 422);
        }
        $award->save();
    }

    public  function  update($id, Request $request)
    {
        $award = Award::find($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'reason' => 'required',
            'institution' => 'required',
            'date' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
                //], 405);
            ], 422);
        }
        $award->name = $request->input('name', $award->name);
        $award->reason = $request->input('reason', $award->reason);
        $award->institution = $request->input('institution', $award->institution);
        $award->date = $request->input('date', $award->date);
        $award->status =$request->input('status', $award->status);
        $award->update();
        return response()->json([
            'data' => $award,
            'total' => count($award)
        ]);
    }
}
