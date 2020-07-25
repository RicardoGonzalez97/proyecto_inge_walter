<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\Notaria;
use Illuminate\Support\Facades\Auth;
use Mockery\Matcher\Not;
use Validator;
use Storage;

class NotariaController extends Controller
{



    //acá comienza la creación para poder guardar la firma electronica a la base de datos
    
    public function  active($id,$NotariaActivate, Requests $request){
       $notaria = New Notaria();
        //Acá crear la funcionalidad para insertar la firma electronica en la base de datos  que fue
        //creada al generar la constancia
        $NotariaActivate = Notaria::find($id);
        $notaria -> texto_firmado();
        $notaria -> encriptado();
        $notaria -> hash();
        $notaria -> students_iid();
        //



        //falta mas cosas, bueno muchas cosas wuuuuuu   =)!
        if(!$NotariaActivate){
            return err();
        }
        else{
            $NotariaActivate->save();
        }


    }
    //Aca termina la creacion de la nueva funcion para guardar el encriptado



    public function index(Request $request)
    {
        //funcion para mostrar todas las notarias creadas
        $notarias = Notaria::all();
        return $notarias;
    }

    public function  show($id, Request $request)
    {
        $notaria = Notaria::find($id);
        return response()->json([
            'data' => $notaria,
            'total' => count($notaria)
        ]);
    }

    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'id',
            'texto_firmado' => 'required',
            'encriptado' => 'required',
            'hash' => 'required',
            'students_id' => 'required',
            'course_id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $notaria = new Notaria();
        $notaria->id = $request->input('id');
        $notaria->texto_firmado = $request ->input('texto_firmado');
        $notaria->encriptado = $request->input('encriptado');
        $notaria->hash = $request ->input('hash');
        $notaria->students_id = $request -> input('students_id');
        $notaria->course_id = $request ->input('course_id');

        $notaria->user_id = Auth::user()->id;
        $notaria->status = 1;
        $notaria->save();
        return response()->json([
            'data' => $notaria,
            'total' => count($notaria)
        ]);
    }

    public  function destroy($id, Request $request)
    {
        $notaria = Notaria::find($id);
        if (empty($notaria)) {
            return response()->json([
                'total' => count($notaria),
                'msg' => 'Notaria no localizada'
            ],422);
        }
        $notaria->delete();

    }

    public  function  update($id, Request $request)
    {
        $notaria = Notaria::find($id);
        $validator = Validator::make($request->all(), [
            'texto_firmado' => 'required',
            'encriptado' => 'required',
            'hash' => 'required',
            'students_id' => 'required|integer',
            'course_id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
                //], 405);
            ], 422);
        }
        $notaria->id = $request ->input('id',$notaria->id);
        $notaria->texto_firmado = $request ->input('texto_firmado', $notaria->texto_firmado);
        $notaria->encriptado = $request->input('encriptado', $notaria->encriptado);
        $notaria->hash = $request ->input('hash', $notaria->hash);
        $notaria->students_id = $request -> input('students_id', $notaria->students_id);
        $notaria->course_id = $request -> input('course_id',$notaria->course_id);
        $notaria->status = $request ->input('status', $notaria->status);
        $notaria->update();
        return response()->json([
            'data' => $notaria,
            'total' => count($notaria)
        ]);
    }
}
