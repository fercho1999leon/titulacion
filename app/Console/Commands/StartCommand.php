<?php

namespace App\Console\Commands;

use App\Demon\DemonSocketServer;
use Illuminate\Console\Command;

class StartCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'startdemon:start';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Inicia demonios';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        DemonSocketServer::start();
    }
}
