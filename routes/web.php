<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// 首页
Route::get('/', function () {
    return view('home.index');
});

Route::get('login', 'UserController@index');

Route::get('game', 'GameController@index');

Route::get('learn', function () {
    return view('home.learn');
});

Route::get('register', function () {
    return view('home.register');
});

Route::get('quiz', function () {
    return view('home.quiz');
});