<?php

namespace App\Http\Controllers\v1;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function limit(&$querys, $request)
    {
        if ($request->has('limit')) {
            $querys = $querys->take($request->input('limit', 15))->skip($request->input('page', 0) * $request->input('limit', 100))->orderBy($request->input('order'), $request->input('order'));
        }

    }

    public function authorization($resource)
    {
        $user_id = Auth::user()->id;
        if(isset($resource->user_id))
        if ($resource->user_id != $user_id) return true;
        return false;

    }

    /**
     * @param array $json
     * @param int $code
     * @return mixed
     */
    public function forbiden($json = ['msg' => 'Acceso denegado.'], $code = 403)
    {
        return response()->json($json, $code);
    }

    public function nofound($json=['msg'=>'Recurso no encontrado.'],$code=404)
    {
        return response()->json($json,$code);

    }
}
