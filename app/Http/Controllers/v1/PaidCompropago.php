<?php

namespace App\Http\Controllers\v1;

use App\Models\v1\PaidCompropagoModel;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class PaidCompropago extends Controller
{
    public function index()
    {

    }

    /**
     * @param Request $request
     */
    public
    function store(Request $request)
    {
        $body = @file_get_contents('php://input');
        $event_json = json_decode($body);
        $payload = new PaidCompropagoModel();
        $payload->name = "compropago";
        $payload->payload = json_encode($event_json);
        $payload->save();
    }
}
