<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Result;

class UserController extends Controller
{
    public function index($action = "", $op = "")
    {
        $user = Auth::User();
        return view('home.user', compact('user', 'action', 'op'));
    }

    public function resultList()
    {
        $user = Auth::User();
        if ($user->role == 1) {
            $results = DB::select("SELECT * FROM results");
        } else {
            $results = DB::select("SELECT * FROM results WHERE username = '$user->username'");
        }
        foreach ($results as $result) {
            $fault_list = json_decode($result->faults, true);
            $faults = "";
            foreach ($fault_list as $index => $fault) {
                if ($fault == "") break;
                $faults .= ("【" . ($index+1) . "】" . $fault);
            }
            $result->faults = $faults;
        }
        return response()->json([
            "code" => 0,
            "msg" => "",
            "count" => count($results),
            "data" => $results
        ]);
    }
}
