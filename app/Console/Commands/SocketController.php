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
    protected $signature = 'socketprivate:send {activation=on}';

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
        event(new ListenerLineElectricEvent(10,20,0,0));
        $this->info('Comando ejecutado');
    }
}
