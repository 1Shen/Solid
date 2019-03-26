<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index($action = "", $op = "")
    {   
        $user = Auth::User();
        return view('home.user', compact('user', 'action', 'op'));
    }
}
