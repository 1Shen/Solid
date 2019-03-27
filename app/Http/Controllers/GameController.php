<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Result;

class GameController extends Controller
{
    public function index()
    {
        return view('scene.scene');
    }

    public function submit(Request $request)
    {   
        $result = Result::create([
            'username' => $request->input('username'),
            'name' => $request->input('name'),
            'time' => $request->input('time'),
            'fault_count' => $request->input('fault_count'),
            'faults' => json_encode($request->input('faults')),
            'score' => $request->input('score')
        ]);

        if ($result) {
            return response()->json([
                'errCode' => 200,
                'errMsg' => 'OK',
            ]);
        } else {
            return response()->json([
                'errCode' => 100,
                'errMsg' => 'Insert执行错误'
            ]);
        }
    }
}
