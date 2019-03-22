<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class UserController extends Controller
{
    public function index()
    {
        return view('home.login');
    }

    public function login(Request $request)
    {

        return Auth::attempt([
            'username' => $request->input('username'),
            'password' => $request->input('password')
        ]);
    }

    // 注册
    public function register(Request $request)
    {
        $data = $request->all();

        if (User::where('username', $data['username'])->first()) {
            return response()->json([
                'errCode' => '100',
                'errMsg' => '用户名重复'
            ]);
        }

        $user = User::create([
            'username' => $data['username'],
            'password' => $data['password'],
            'email' => $data['email'],
            'role' => $data['role'],
            'login' => 1
        ]);

        if ($user) {
            return response()->json([
                'errCode' => '200',
                'errMsg' => '注册成功',
                'user' => $user
            ]);
        } else {
            return response()->json([
                'errCode' => '101',
                'errMsg' => '信息存在格式错误'
            ]);
        }
    }
}
