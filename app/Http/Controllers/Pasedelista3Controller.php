<?php

namespace App\Http\Controllers;
use App\Models\v1\Students;
use Request;

class Pasedelista3Controller extends Controller
{
    public function update($idPaselista3){
        $pasedelista3=Students::find($idPaselista3);
        $pasedelista3->type=Request::input('type');
        $pasedelista3->save();
        return $pasedelista3;
    }
}
