<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class InicioController extends Controller
{
    /**
     * @return string
     */
    public function index()
    {
        return view("app.index");
    }
    
}
