<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Quiz;

class QuizController extends Controller
{
    public function index()
    {
        return view('home.quiz');
    }

    public function addQuiz(Request $request)
    {
        $pic_path = $request->file('pic') ?
            substr($request->file('pic')->store('public/quiz/pic'), 6) : '';
        $aimg_path = $request->file('aimg') ?
            substr($request->file('aimg')->store('public/quiz/options'), 6) : '';
        $bimg_path = $request->file('bimg') ?
            substr($request->file('bimg')->store('public/quiz/options'), 6) : '';
        $cimg_path = $request->file('cimg') ?
            substr($request->file('cimg')->store('public/quiz/options'), 6) : '';
        $dimg_path = $request->file('dimg') ?
            substr($request->file('dimg')->store('public/quiz/options'), 6) : '';

        $options = array(
            'A' => array('text' => $request->input('atext'), 'img' => $aimg_path),
            'B' => array('text' => $request->input('btext'), 'img' => $bimg_path),
            'C' => array('text' => $request->input('ctext'), 'img' => $cimg_path),
            'D' => array('text' => $request->input('dtext'), 'img' => $dimg_path),
        );

        $quiz = Quiz::create([
            'title' => $request->input('title'),
            'pic' => $pic_path,
            'options' => json_encode($options),
            'answer' => $request->input('answer'),
            'analysis' => $request->input('analysis')
        ]);

        if ($quiz) {
            return response()->json([
                'errCode' => 200,
                'errMsg' => 'OK'
            ]);
        } else {
            return response()->json([
                'errCode' => 100,
                'errMsg' => 'Insert执行错误'
            ]);
        }
    }

    public function fetchQuizzes()
    {
        $quizzes = DB::select("SELECT * FROM quizzes ORDER BY RAND() LIMIT 5");
        return compact('quizzes');
    }

    public function quizList()
    {
        $quizzes = DB::select("SELECT * FROM quizzes");
        foreach ($quizzes as $quiz) {
            $options = json_decode($quiz->options);
            $quiz->optionA = $options->A->text;
            $quiz->optionB = $options->B->text;
            $quiz->optionC = $options->C->text;
            $quiz->optionD = $options->D->text;
        }
        return response()->json([
            "code" => 0,
            "msg" => "",
            "count" => count($quizzes),
            "data" => $quizzes
        ]);
    }
}
