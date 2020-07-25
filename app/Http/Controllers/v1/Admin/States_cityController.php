<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\States_City;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;

class states_cityController extends Controller
{
    public function index(Request $request)
    {
        $state_city = States_City::where('status', 0);
        $this->limit($state_city, $request);
        $state_city = $state_city->get();
        return response()->json([
            'data' => $state_city,
            'total' => count($state_city)
        ]);
    }

    public function  show($id, Request $request)
    {
        $state_city = States_City::find($id);
        return response()->json([
            'data' => $state_city,
            'total' => count($state_city)
        ]);
    }

    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            //'name' => 'required',
            'state_id' => 'required|integer',
            'city_id' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 405);
        }

        $state_city = new States_City();
        $state_city->state_id = $request->input('state_id');
        $state_city->city_id = $request->input('city_id');
        //$state_city->name = $request->input('name');
        $state_city->user_id = 1;//Auth::user()->id;
        $state_city->status = 0;
        $state_city->save();
        return response()->json([
            'data' => $state_city,
            'total' => count($state_city)
        ]);
    }

    public  function destroy($id, Request $request)
    {
        $state_city = States_City::find($id);
        if (empty($state_city)) {
            return response()->json([
                'errors' => null,
                'total' => count($state_city),
                'msg' => 'Estado no localizado'
            ]);
        }
        $state_city->delete();
    }

    public  function  update($id, Request $request)
    {
        $state_city = States_City::find($id);
        $validator = Validator::make($request->all(), [
            'state_id' => 'required|integer',
            'city_id' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 405);
        }

        $state_city->state_id = $request->input('state_id', $state_city->state_id);
        $state_city->city_id = $request->input('city_id', $state_city->city_id);
        $state_city->update();
        return response()->json([
            'data' => $state_city,
            'total' => count($state_city)
        ]);
    }
}
