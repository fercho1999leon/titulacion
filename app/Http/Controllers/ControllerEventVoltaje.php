<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\NotifyError;
use App\Models\Notify;
use Illuminate\Support\Facades\Mail;

class ControllerEventVoltaje extends Controller
{
    public function managerEventVoltaje(Request $request)
    {
        if ($request->v1 < $request->vmin) {
            $msg = 'SE GENERO UNA CAIDA DE TENSION EN LA LINEA PRINCIPAL VOLTAJE DE LINEA PRINCIPAL: %d V' . "\n"
                . 'EN %d SEGUNDOS INICIARA ACCIONES DE RESPALDO';
            $msg = sprintf($msg, $request->v1, $request->timeActionError);
        } elseif ($request->v1 > $request->vmax) {
            $msg = 'SE GENERO UN EVENTO DE SOBRE TENSION DE TENSION EN LA LINEA PRINCIPAL: %d V' . "\n"
                . 'EN %d SEGUNDOS INICIARA ACCIONES DE RESPALDO';
            $msg = sprintf($msg, $request->v1, $request->timeActionError);
        }
        $DateAndTime = date('Y-m-d h:i:s', time()); 
        $data = new Notify();
        $data->evento = $msg;
        $data->opend = 1;
        $data->time_data = $DateAndTime;
        $data->save();
        $correo = new NotifyError($msg);
        Mail::to($request->email)->send($correo);
        return response(['msg'=>$msg],200);
    }
    public function managerEventRecovery(Request $request)
    {
        if ($request->v2 > $request->umbral) {
            $msg = 'SE INICIO CORRECTAMENTE EL SISTEMA DE RESPALDO ANTE EL EVENTO GENERADO POR LA LINA PRINCIPAL
                   VOLTAJE DEL BACKUP %d V';
            $msg = sprintf($msg, $request->v2);
        } else {
            $msg = 'ERROR CRITICO EN ENCENDIDO DEL GENERADOR DESPUES DE 3 INTENTOS NO ENCIENDE'. "\n".
                    'REVISAR ESTADO OPERATIVO DEL GENERADOR';
            $data = new Notify();
            $data->evento = $msg;
            $data->opend = 1;
            $data->save();
        }
        $correo = new NotifyError($msg);
        Mail::to($request->email)->send($correo);
        return response(['msg'=>$msg],200);
    }
}
