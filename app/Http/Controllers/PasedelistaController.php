<?php

namespace App\Http\Controllers;
use App\Models\v1\Students;
use Request;

class PasedelistaController extends Controller
{
    public function update($idPaselista){
        $pasedelista=Students::find($idPaselista);
        $pasedelista->certificate=Request::input('certificate');
        $pasedelista->save();
        return $pasedelista;
    }
}
