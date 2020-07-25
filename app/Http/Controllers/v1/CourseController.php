<?php

namespace App\Http\Controllers\v1;

use App\Models\v1\Students;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\Course;
use Illuminate\Support\Facades\Auth;
use mPDF;
use Validator;
use Storage;
use PDF;
use QrCode;
use Crypt;
use Redirect;
use Illuminate\Http\Dispatcher;

class CourseController extends Controller
{
    /**
     *
     * @param Request $request <- POST,GET, DELETE,UPDATE
     * Muestra todols los cursos /GET
     * @return  courses
     */
    public function getConstancia($id, Request $request)
    {
       /* $id_user = Auth::user()->id;
        return $this->generarContancia($id,$id_user);*/
        $course = Course::with('author', 'students')->find($id);
        $id_students=decrypt($request->input('id'));
        $course=Students::find($id_students);
        return $this->generarContancia($course->course_id,$course->user_id);

    }

    public function getConstanciaUser($id,$id_user,Request $request)
    {

         $id_user = Auth::user()->id;
        return $this->generarContancia($id,$id_user);


    }
    public function constancia($id,$course){
        $course = Course::with('author', 'students')->find($id);
        return response()->json([
            'data' => $course,
            'total' => count($course)
        ]);
    }

    public function generarContancia($id,$id_user,$view='I'){
        $course = Course::selectRaw('course.user_id,students.id students,students.type as tipo,students.hash as firma,cellphone,course.name as curso,start_date as fecha,duracion,course.id,concat(user.ap_pat," ",user.ap_mat," ",user.name) as alumno')
            ->where('course.id', $id)
            ->join('students', 'course.id', '=', 'students.course_id')
            ->join('user', 'user.id', '=', 'students.user_id')
            ->where('students.user_id', $id_user)
            ->where('students.status', 1)
            ->where('certificate', 1)
            ->with(['author'=>function($query){ return $query->selectRaw("id,concat(name,' ',ap_pat,' ',ap_mat) as nombre");}])
            ->first();
        // return $course;
        if (!$course)
            return "<h1>Usuario no registrado al curso  o pendiente de validación, contacta al encargado del curso, o envianos un correo <a href='mailto:dangpark17@gmail.com'>dangpark17@gmail.com</a></h1>";

        $data = [];
        $data['curso'] = $course;
        $data['key'] = Crypt::encrypt($course->students);
        $html = view('pdf.course', $data)->render();
        $mpdf = new mPDF('c', 'a4-L');
        $mpdf->SetWatermarkImage('certificado.png');
        $mpdf->showWatermarkImage = true;
        $mpdf->WriteHTML($html);
        $mpdf->Output("certificado.pdf", $view);
    }

    public function index(Request $request)
    {

        $search = $request->input('search');

        $courses = Course::where('keywords', 'like', "%$search%")
            ->orWhere('name', 'like', "%$search%")
            ->orWhere('description', 'like', "%$search%")->orderBy($request->input('order', 'name'), $request->input('orderType', 'desc'));

        $n = $courses->count();
        $courses = $courses->take($request->input('limit', 5))->skip($request->input('page', 0) * $request->input('limit', 5))
            ->get();
        foreach ($courses as $course) {
            $course->author;
            $course->categoryCourse;
        }

        //$this->limit($courses, $request);
        //$courses = $courses->get();
        return response()->json([
            'data' => $courses,
            'total' => $n
        ]);
    }

    /**
     * @param Request $request
     * Obtiene un curso en especifico /GET
     *      * @return  course
     */
    public function show($id, Request $request)
    {
        
        $course = Course::with('author', 'students')->find($id);
            return response()->json([
                'data' => $course,
                'total' => count($course)
            ]);

        $id_user = Auth::user()->id;
        $id_students = decrypt($request->input('id'));
        $course= Students::find($id_students);
        return $this->generarContancia($course->course_id,$course->id_user);
    }

    /**
     * @param Request $request
     * Crea un curso  /POST
     *      * @return  course
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'keywords' => 'required',
            'price' => 'required|numeric',
            'quota_max' => 'required|numeric',
            'quota_min' => 'required|numeric',
            'hangouts' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'certificate_title' => 'required',
            'typeCourse_id' => 'required',
            'categoryCourse_id' => 'required',
            'direction' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $course = new Course();
        $course->name = $request->input('name');
        $course->description = $request->input('description');
        $course->direction = $request->input('direction');
        $course->lat = $request->input('lat');
        $course->lng = $request->input('lng');
        $course->keywords = $request->input('keywords');
        $course->price = $request->input('price');
        $course->quota_max = $request->input('quota_max');
        $course->hangouts = $request->input('hangouts');
        $course->duracion = $request->input('duracion');
        $course->quota_min = $request->input('quota_min');
        $course->start_date = $request->input('start_date');
        $course->end_date = $request->input('end_date');
        $course->certificate_title = $request->input('certificate_title');
        $course->typeCourse_id = $request->input('typeCourse_id');
        $course->categoryCourse_id = $request->input('categoryCourse_id');
        $course->user_id = Auth::user()->id;
        $course->authorize = 1;
        $course->status = 1;
        $course->save();
        return response()->json([
            'data' => $course,
            'total' => count($course)
        ]);
    }

    /**
     * @param $id
     * @param Request $request
     * Elimina un curso /DELETE
     *      * @return  course
     */

    public function destroy($id, Request $request)
    {
        $course = Course::find($id);
        if (empty($course)) {
            return response()->json([
                //'errors' => null,
                'total' => count($course),
                'msg' => 'Curso no localizado, no localizado'
            ], 422);
        }
        $course->delete();
    }

    /**
     * @param $id
     * @param Request $request
     * Actualiza un curso /UPDATE
     *      * @return  course
     */

    public function CourseFiles($id, Request $request)
    {
        $course = Course::find($id);
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:pdf,PDF,JPG,jpg,png,JPEG,jpeg,BMP,bmp,docx,xls,pptx,ppt,doc|max:10000',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $archivos = explode(",", $course->files);
        if (count($archivos) < 10) {
            $file = $request->file('file');
            $nombre = str_replace(",", "_", "cursos/" . $course->id . "/material/" . $course->id . "__" . (round(microtime(true) * 1000) . '_' . str_random(2) . '_' . trim($file->getClientOriginalName())));
            \Storage::disk('local')->put($nombre, \File::get($file));
            array_push($archivos, $nombre);
            $course->files = implode(',', $archivos);
            $course->save();

            return response()->json([
                'data' => $course,
                'total' => count($course)
            ]);
        } else {
            return response()->json([
                'errors' => ['archivos' => "Ya tienes más de 10 archivos cargados..."]
            ], 422);
        }
        $course->save();

    }

    public function CourseImages($id, Request $request)
    {
        $course = Course::find($id);
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:JPG,jpg,png,PNG,JPEG,jpeg,BMP,bmp|max:4000',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $file = $request->file('file');
        $nombre = str_replace(",", "_", "cursos/" . $course->id . "/cover/" . $course->id . "__" . (round(microtime(true) * 1000) . '_' . str_random(2) . '_' . trim($file->getClientOriginalName())));
        \Storage::disk('local')->put($nombre, \File::get($file));
        $course->image = $nombre;
        $course->save();
        return response()->json([
            'data' => $course,
            'total' => count($course)
        ]);
    }

    public function update($id, Request $request)
    {
        $course = Course::find($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            'keywords' => 'required',
            'price' => 'required',
            'hangouts' => 'required',
            'quota_max' => 'required',
            'duracion' => 'required',
            'quota_min' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'certificate_title' => 'required',
            'typeCourse_id' => 'required|integer',
            'categoryCourse_id' => 'required|integer',
            'authorize' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $course->name = $request->input('name', $course->name);
        $course->description = $request->input('description', $course->description);
        $course->direction = $request->input('direction', $course->direction);
        $course->lat = $request->input('lat', $course->lat);
        $course->lug = $request->input('lug', $course->lug);
        $course->keywords = $request->input('keywords', $course->keywords);
        $course->price = $request->input('price', $course->price);
        $course->quota_max = $request->input('quota_max', $course->quota_max);
        $course->hangouts = $request->input('hangouts', $course->hangouts);
        $course->duracion = $request->input('duracion', $course->duracion);
        $course->quota_min = $request->input('quota_min', $course->quota_min);
        $course->start_date = $request->input('start_date', $course->start_date);
        $course->end_date = $request->input('end_date', $course->end_date);
        $course->certificate_title = $request->input('certificate_title', $course->certificate_title);
        $course->typeCourse_id = $request->input('typeCourse_id', $course->typeCourse_id);
        $course->categoryCourse_id = $request->input('categoryCourse_id', $course->categoryCourse_id);
        $course->authorize = $request->input('authorize', $course->authorize);
        $course->status = $request->input('status', $course->status);
        $course->update();
        return response()->json([
            'data' => $course,
            'total' => count($course)
        ]);
    }
}
