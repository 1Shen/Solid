<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Quiz;

class QuizController extends Controller
{
    public function index()
    {   
        $quizzes = Quiz::select("SELECT * FROM quizzes ORDER BY RAND() LIMIT 10");
        dd($quizzes);
        return view('home.quiz');
    }
}
