<?php

namespace App\Http\Controllers;

use App\Models\ConfiguracionRaspberry;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function PHPUnit\Framework\isEmpty;
use function PHPUnit\Framework\returnValueMap;

class ControllerConfigRaspberry extends Controller
{
    public function create(Request $request){
        $configuraciones = ConfiguracionRaspberry::all();
        if (isEmpty($configuraciones) && isset($configuraciones)){
            foreach ($configuraciones as $configuracion){
                if($configuracion->active === 1){
                    ConfiguracionRaspberry::where('id',$configuracion->id)->update([
                        'active'=>0
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
            return response([],200);
        }
        return response([],500);
    }

    public function read(){
        $configuraciones = ConfiguracionRaspberry::all();
        $resp = array();
        if(isEmpty($configuraciones) && isset($configuraciones)){
            foreach($configuraciones as $configuracion){
                array_push($resp,[
                    'user_create' => (User::where('id',$configuracion->user_id)->first())->name,
                    'configuracion' => $configuracion
                ]);
            }
        }
        return response($resp,200);
    }

    public function delect(Request $request){
        $configuracion = ConfiguracionRaspberry::where('id',$request->id)->first();
        if($configuracion!=null){
            $configuracion->delete();
            return $this->read();
        }
        return response([
            'msg'=> 'Registro no existe'
        ],500);
    }
}
