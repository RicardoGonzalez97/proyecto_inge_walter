<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public  function  limit(&$querys,$request){
        if($request->has('limit')){
            $querys= $querys->take($request->input('limit', 10))->skip($request->input('page', 0) * $request->input('limit', 10))->orderBy($request->input('order','created_at'),$request->input('orderby','desc'));
        }
        
    }
}
