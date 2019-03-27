<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    protected $fillable = [
        'username', 'name', 'time', 'faults', 'fault_count', 'score'
    ];
}
