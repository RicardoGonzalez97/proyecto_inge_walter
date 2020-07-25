<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\Title;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;

class TitleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $titles = Title::all();
        return response()->json([
            'data' => $titles,
            'total' => count($titles)
        ]);
    }

    public function  show($id, Request $request)
    {
        $title = Title::find($id);
        return response()->json([
            'data' => $title,
            'total' => count($title)
        ]);
    }

    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'degree' => 'required',
            'title_degree' => 'required',
            'license' => 'required',
            'credential_number' => 'required',
            'institution_degree' => 'required',
            'date_degree' => 'required',
            'country' => 'required',
            'institution' => 'required',
            'registration' => 'required',
            'average' => 'required',
            'credits_start_date' => 'required',
            'credits_finish_date' => 'required',
            'sector' => 'required',
            'priority_area' => 'required',
            'knowledge_area' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $title = new Title();
        $title->degree = $request->input('degree');
        $title->title_degree = $request->input('title_degree');
        $title->license = $request->input('license');
        $title->credential_number = $request->input('credential_number');
        $title->institution_degree = $request->input('institution_degree');
        $title->date_degree = $request->input('date_degree');
        $title->country = $request->input('country');
        $title->institution = $request->input('institution');
        $title->registration = $request->input('registration');
        $title->average = $request->input('average');
        $title->credits_start_date = $request->input('credits_start_date');
        $title->credits_finish_date = $request->input('credits_finish_date');
        $title->sector = $request->input('sector');
        $title->priority_area = $request->input('priority_area');
        $title->knowledge_area = $request->input('knowledge_area');
        $title->user_id = Auth::user()->id;
        $title->status = 1;
        $title->save();
        return response()->json([
            'data' => $title,
            'total' => count($title)
        ]);
    }

    public  function destroy($id, Request $request)
    {
        $title = Title::find($id);
        if (empty($title)) {
            return response()->json([
                'total' => count($title),
                'msg' => 'Título académico no localizado'
            ],422);
        }
        $title->delete();
    }

    public function TitleFiles($id, Request $request)
    {
        $title = Title::find($id);
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:pdf,PDF,JPG,jpg,png,JPEG,jpeg,BMP,bmp,docx,xls,pptx,ppt,doc|max:8000',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $archivos = explode(",", $title->files);
        if (count($archivos) < 1) {
            $file = $request->file('file');
            $nombre = str_replace(",", "_", "articulo/" . $title->id . "/material/" . $title->id . "__" . (round(microtime(true) * 1000) . '_' . str_random(2) . '_' . trim($file->getClientOriginalName())));
            \Storage::disk('local')->put($nombre, \File::get($file));
            array_push($archivos, $nombre);
            $title->files = implode(',', $archivos);
            $title->save();

            return response()->json([
                'data' => $title,
                'total' => count($title)
            ]);
        } else {
            return response()->json([
                'errors' => ['archivos' => "Ya tienes más de 1 archivo cargado..."]
            ], 422);
        }
        $title->save();

    }

    public  function  update($id, Request $request)
    {
        $title = Title::find($id);
        $validator = Validator::make($request->all(), [
            'degree' => 'required',
            'title_degree' => 'required',
            'license' => 'required',
            'credential_number' => 'required',
            'institution_degree' => 'required',
            'date_degree' => 'required',
            'country' => 'required',
            'institution' => 'required',
            'registration' => 'required',
            'average' => 'required',
            'credits_start_date' => 'required',
            'credits_finish_date' => 'required',
            'sector' => 'required',
            'priority_area' => 'required',
            'knowledge_area' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
                //], 405);
            ], 422);
        }

        $title->degree = $request->input('degree', $title->degree);
        $title->title_degree = $request->input('title_degree', $title->title_degree);
        $title->license = $request->input('license', $title->license);
        $title->credential_number = $request->input('credential_number', $title->credential_number);
        $title->institution_degree = $request->input('institution_degree',  $title->institution_degree);
        $title->date_degree = $request->input('date_degree', $title->date_degree);
        $title->country = $request->input('country', $title->country);
        $title->institution = $request->input('institution', $title->institution);
        $title->registration = $request->input('registration', $title->registration);
        $title->average = $request->input('average', $title->average);
        $title->credits_start_date = $request->input('credits_start_date', $title->credits_start_date);
        $title->credits_finish_date = $request->input('credits_finish_date', $title->credits_finish_date);
        $title->sector = $request->input('sector', $title->sector);
        $title->priority_area = $request->input('priority_area', $title->priority_area);
        $title->knowledge_area = $request->input('knowledge_area', $title->knowledge_area);
        $title->status =$request->input('status', $title->status);
        $title->update();
        return response()->json([
            'data' => $title,
            'total' => count($title)
        ]);
    }
}
