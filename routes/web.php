<?php

use Carbon\Traits\Rounding;

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

// game
Route::get('game', 'GameController@index');

// learn
Route::get('learn', function () {
    return view('home.learn');
});

// quiz
Route::get('quiz', 'QuizController@index');
Route::get('quiz/fetch', 'QuizController@fetchQuizzes');
Route::get('quiz/list', 'QuizController@quizList');
Route::post('quiz/add', 'QuizController@addQuiz')->middleware('filter_empty_values');


// user
Route::get('user', 'UserController@index');
Route::get('user/{action}/{op}', 'UserController@index');


Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');

Route::get('register1', function () {
    return view('home.register');
});
