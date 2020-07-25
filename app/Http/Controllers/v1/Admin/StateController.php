<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\v1\State;
use Illuminate\Support\Facades\Auth;
use Validator;
use Storage;

class StateController extends Controller
{
    public function index(Request $request)
    {
        $state = State::where('status', 0);
        $this->limit($state, $request);
        $state = $state->get();
        return response()->json([
            'data' => $state,
            'total' => count($state)
        ]);
    }

    public function  show($id, Request $request)
    {
        $state = State::find($id);
        return response()->json([
            'data' => $state,
            'total' => count($state)
        ]);
    }

    public  function  store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $state = new State();
        $state->name = $request->input('name');
        $state->user_id = 1;//Auth::user()->id;
        $state->status = 0;
        $state->save();
        return response()->json([
            'data' => $state,
            'total' => count($state)
        ]);
    }

    public  function destroy($id, Request $request)
    {
        $state = State::find($id);
        if (empty($state)) {
            return response()->json([
                'errors' => null,
                'total' => count($state),
                'msg' => 'Estado no localizado'
            ]);
        }
        $state->delete();
    }

    public  function  update($id, Request $request)
    {
        $state = State::find($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 405);
        }

        $state->name = $request->input('name', $state->name);
        $state->update();
        return response()->json([
            'data' => $state,
            'total' => count($state)
        ]);
    }
}
