<?php

namespace App\Http\Middleware;

use Closure;

class FilterEmptyValues
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $params = collect($request)->map(function ($item) {
            if ($item == null || $item == 'undefined') {
                $item = '';
            }
            return $item;
        });
        $request->replace($params->all());

        return $next($request);
    }
}
