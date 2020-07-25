<?php

namespace App\Http\Controllers\v1\Admin\CourseAdmin;

use App\Models\v1\Course;
use App\Models\v1\Students;
use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class StudensForCourseController extends Controller
{
    /**
     * @description Api para consumir los alumnos inscritos en el curso.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $students = Students::where('course_id', $request->input('course_id'))->with('usuario');
        $n = $students->count();
        $this->limit($students, $request);
        $students = $students->take($request->input('limit', 10))->skip($request->input('page', 0) * $request->input('limit', 10))->orderBy($request->input('order', 'created_at'), $request->input('orderby', 'desc'))->get();
        return response()->json(['data' => $students, 'total' => $n]);
    }


    public function store(Request $request)
    {
        $course_id=$request->input('course_id');
        $student = Students::where('course_id', $request->input('course_id'))->where('user_id', Auth::user()->id)->first();
        if (!$student)
            $student = new Students();
        $id_user = Auth::user()->id;
        $id_course=$request->input('course_id');
        $student->course_id = $request->input('course_id');
        $student->user_id = Auth::user()->id;
        $student->status = 0;
        $student->certificate = 0;
        $student->type = 'Por demostrar un compromiso en su formación, al haber asistido al curso denominado';

        $empresa="Grupo de Investigación Cientifica y de Desarrollo Tecnológico AC";
        $presidente="Walter Torres Robledo";

        $cursoyfecha = DB::table('course')
            ->select(['name', 'start_date'])->get();

        $instructorcurso = DB::table('course')
            ->select(['user_id'])->get();

        /*    $instructorcurso = DB::table('course')
            ->join('user','user.id_user_id','=','course.id','inner',true)
            ->select('course.*','user.id as id', 'user.name')
            ->get();

            $facturasCliente = DB::table('clientes')
            ->join('facturas', 'facturas.id_cliente', '=', 'clientes.id', 'inner', true)
            ->select('clientes.*', 'facturas.id as id_factura', 'facturas.fecha')
            ->where('clientes.email', '=', 'miguel@desarrolloweb.com')
            ->get();
*/
        //  var_dump($empresa);
        //var_dump($presidente);
        //var_dump($cursoyfecha);


        //   $encriptar=$cursoyfecha . $instructorcurso;


        $encriptar=$cursoyfecha[0]->start_date.$cursoyfecha[0]->name.$instructorcurso[0]->user_id.$empresa.$presidente;
        $firma= password_hash($encriptar, PASSWORD_DEFAULT);

        $student->hash=$firma;
        $student->save();

        return response()->json([
            'data' => $student,
            'total' => count($student)
        ]);

    }

    public function active(Request $request) {
        /*$student =Students::where('course_id',$request->input('course_id'))->where('user_id',$request->input('user_id'))->first();

        $student->course_id = $request->input('course_id');
        $student->user_id = $request->input('user_id');

            $student->certificate =1;
            $student->save();*/
        return$request->certificate;

        }


    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $students = Students::where('course_id', $id)->where('user_id', Auth::user()->id)->with('usuario')->first();
        return response()->json(['data' => $students]);

    }


    public function update($id){
    

    }
    public function deleted($id, Request $request)
    {

    }
}
