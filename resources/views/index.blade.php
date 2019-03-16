<?php

use App\Student;

$students = Student::all();

foreach ($students as $flight) {
    echo $flight->name. '<br>';
    echo '____________________________<br>';
    foreach ($flight->courses as $course) {
        echo $course->tea_name. '<br>';
    }
    // echo $flight->courses;
    echo '____________________________<br>';
}