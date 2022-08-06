<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\NotifyError;
use Illuminate\Support\Facades\Mail;

class ControllerEventVoltaje extends Controller
{
    public function managerEventVoltaje(Request $request)
    {
        if ($request->v1 < $request->vmin) {
            $msg = 'SE GENERO UNA CAIDA DE TENSION EN LA LINEA PRINCIPAL VOLTAJE DE LINEA PRINCIPAL: %d V' . "\n"
                . 'EN %d MINUTOS INICIARA ACCIONES DE RESPALDO';
            $msg = sprintf($msg, $request->v1, $request->timeActionError);
        } elseif ($request->v1 > $request->vmax) {
            $msg = 'SE GENERO UN EVENTO DE SOBRE TENSION DE TENSION EN LA LINEA PRINCIPAL: %d V' . "\n"
                . 'EN %d MINUTOS INICIARA ACCIONES DE RESPALDO';
            $msg = sprintf($msg, $request->v1, $request->timeActionError);
        }
        $correo = new NotifyError($msg);
        Mail::to($request->email)->send($correo);
        return response(['msg'=>$msg],200);
    }
}
