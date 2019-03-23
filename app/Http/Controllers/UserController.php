<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {   
        $user = Auth::User();
        return view('home.user', ['user' => $user]);
    }
}
