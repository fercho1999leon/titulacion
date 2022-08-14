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
    public function barrerGraphic(Request $request){
        $arryEvent = array();
        for ($i = 1; $i <= 12; $i++){
            $filled_int = sprintf("%02d", $i);
            $result = Notify::where('time_data','LIKE','%'.$request->year.'-'.$filled_int.'%')->count();
            array_push($arryEvent,[
                'month' => $filled_int,
                'count' => $result
            ]);
        }
        return json_encode($arryEvent);
    }
    public function remove(Request $request){
        Notify::where('id',$request->id)->delete();
        return json_encode(array('code'=>0));
    }
}
