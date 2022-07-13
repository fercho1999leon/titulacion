<?php

namespace App\Http\Controllers;

use App\Models\Notify;
use Illuminate\Http\Request;

class ControllerNotify extends Controller
{
    public function store(Request $request){
        $result = Notify::where('time_data','LIKE','%'.$request->year.'-'.$request->month.'%')->get();
        return json_encode($result);
    }
    public function remove(Request $request){
        Notify::where('id',$request->id)->delete();
        return json_encode(array('code'=>0));
    }
}
