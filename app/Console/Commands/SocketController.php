<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\ListenerLineElectricEvent;

class SocketController extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'socketprivate:send {V1} {V2} {A1} {A2}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Genera evento para enviar datos';

    /**
     * Execute the console command.
     *
     * @return int
     */

    public function handle()
    {
        $voltaje1 = $this->argument("V1");
        $voltaje2 = $this->argument("V2");
        $corriente1 = $this->argument("A1");
        $corriente2 = $this->argument("A2");
        //event(new ListenerLineElectricEvent($voltaje1,$voltaje2,$corriente1,$corriente2));
        $this->info('Comando ejecutado');
    }
}
