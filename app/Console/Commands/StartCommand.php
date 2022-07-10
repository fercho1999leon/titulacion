<?php

namespace App\Console\Commands;

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
        exec('php artisan websockets:serve');
        exec('php '.__DIR__.'/../app/demon/DemonSocketServer.php');
        exec('python3 '.__DIR__.'/../app/demon/DemonSocketClient.py');
    }
}
