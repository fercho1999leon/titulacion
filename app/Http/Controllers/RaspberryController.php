<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ListenerLineElectricEvent;
use App\Mail\NotifyError;
use Illuminate\Support\Facades\Mail;
use App\Models\ConfiguracionRaspberry;

class RaspberryController extends Controller
{
    public function sendData(Request $request){
        event(new ListenerLineElectricEvent(intval($request->v1),intval($request->v2),round(floatval($request->a1), 2),intval($request->a2)));
        $response = [
            'msg' => "EVENTO ENVIADO",
        ];
        return response($response, 201);
    }

    public function getConfiInitial(){
        $resp = array();
        $configuraciones = ConfiguracionRaspberry::all();
        foreach($configuraciones as $configuracion){
            if($configuracion->active==1){
                array_push($resp,[
                    'CSRF_TOKEN' => csrf_token(),
                    'CONFIG' => $configuracion
                ]);
            }
        }
        return response($resp,200);
        
    }
}
