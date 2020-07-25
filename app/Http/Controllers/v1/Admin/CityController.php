<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\City;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;

class CityController extends Controller
{
    public function index(Request $request)
    {
        $citys = City::where('status', 0);
        $this->limit($citys, $request);
        $citys = $citys->get();
        return response()->json([
            'data' => $citys,
            'total' => count($citys)
        ]);
    }

    public function  show($id, Request $request)
    {
        $citys = City::find($id);
        return response()->json([
            'data' => $citys,
            'total' => count($citys)
        ]);
    }

    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'state_id' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $city = new City();
        $city->name = $request->input('name');
        //$city->state_id = $request->input('state_id');
        $city->user_id = 1;//Auth::user()->id;
        $city->status = 0;
        $city->save();
        return response()->json([
            'data' => $city,
            'total' => count($city)
        ]);
    }

    public  function destroy($id, Request $request)
    {
        $city = City::find($id);
        if (empty($city)) {
            return response()->json([
                'errors' => null,
                'total' => count($city),
                'msg' => 'Ciudad no localizada'
            ]);
        }
        $city->delete();
    }

    public  function  update($id, Request $request)
    {
        $city = City::find($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            //'state_id' => 'required|integer'
            'state_id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 405);
        }
        $city->name = $request->input('name', $city->name);
        //$city->state_id = $request->input('state_id', $city->state_id);
        $city->update();
        return response()->json([
            'data' => $city,
            'total' => count($city)
        ]);
    }
    
}
