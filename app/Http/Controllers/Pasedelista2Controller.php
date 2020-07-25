<?php

namespace App\Http\Controllers;
use App\Models\v1\Students;
use Request;

class Pasedelista2Controller extends Controller
{
    public function update($idPaselista2){
        $pasedelista2=Students::find($idPaselista2);
        $pasedelista2->status=Request::input('status');
        $pasedelista2->save();
        return $pasedelista2;
    }
}
