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

// login
Route::get('login', function () {
    return view('home.login');
});
Route::post('/user/login', 'UserController@login');

// register
Route::get('register', function () {
    return view('home.register');
});
Route::post('register', 'UserController@register');

// game
Route::get('game', 'GameController@index');

// learn
Route::get('learn', function () {
    return view('home.learn');
});
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
