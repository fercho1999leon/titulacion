<?php

namespace App\Http\Controllers;

use App\Models\ConfiguracionRaspberry;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\Rule;
use App\Events\ListenerDbConfig;
use function PHPUnit\Framework\isEmpty;

class ControllerConfigRaspberry extends Controller
{
    protected function validatevoltaje($vmin, $vmax)
    {
        if ($vmin < $vmax) {
            return true;
        }
        return false;
    }
    public function create(Request $request)
    {
        $rules = array(
            'email' => 'required|email:rfc,dns',
            'timeActionError' => 'required|numeric|between:0,500',
            'timeLastError' => 'required|numeric|between:0,500',
            'vmax' => 'required|numeric|between:0,250',
            'vmin' => ['required', Rule::prohibitedIf(fn () => !$this->validatevoltaje($request->vmin, $request->vmax))],
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Response::json(array(
                'success' => false,
                'errors' => $validator->getMessageBag()->toArray(),
            ), 400);
        }
        $configuraciones = ConfiguracionRaspberry::all();
        if (isEmpty($configuraciones) && isset($configuraciones)) {
            foreach ($configuraciones as $configuracion) {
                if ($configuracion->active === 1) {
                    ConfiguracionRaspberry::where('id', $configuracion->id)->update([
                        'active' => 0
                    ]);
                }
            }
            $save_config = new ConfiguracionRaspberry();
            $save_config->line = $request->line;
            $save_config->timeActionError = $request->timeActionError;
            $save_config->timeLastError = $request->timeLastError;
            $save_config->email = $request->email;
            $save_config->vmax = $request->vmax;
            $save_config->vmin = $request->vmin;
            $save_config->active = 1;
            $save_config->user_id = Auth::user()->id;
            $save_config->save();

            $config = $this->read();

            event(new ListenerDbConfig($config));
            return Response::json(array(
                'success' => true,
            ), 200);
        }
        return Response::json(array(
            'success' => false,
            'errors' => ['sql' => 'error'],
        ), 400);
    }

    public function read()
    {
        $configuraciones = ConfiguracionRaspberry::all();
        $resp = array();
        if (isEmpty($configuraciones) && isset($configuraciones)) {
            foreach ($configuraciones as $configuracion) {
                array_push($resp, [
                    'user_create' => (User::where('id', $configuracion->user_id)->first())->name,
                    'configuracion' => $configuracion
                ]);
            }
        }
        return response($resp, 200);
    }

    public function delect(Request $request)
    {
        $configuracion = ConfiguracionRaspberry::where('id', $request->id)->first();
        if ($configuracion != null) {
            $configuracion->delete();
            return $this->read();
        }
        return response([
            'msg' => 'Registro no existe'
        ], 500);
    }

    public function update(Request $request)
    {
        $configuraciones = ConfiguracionRaspberry::all();
        foreach ($configuraciones as $configuracion) {
            if ($configuracion->active === 1) {
                ConfiguracionRaspberry::where('id', $configuracion->id)->update([
                    'active' => 0
                ]);
            }
        }
        ConfiguracionRaspberry::where('id', $request->id)->update(
            [
                'active' => 1
            ]
        );
        return $this->read();
    }
}
