<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ListenerLineElectricEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $VoltajeyCorriente;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($V1 ,$V2 ,$A1 ,$A2)
    {
        $this->VoltajeyCorriente=array(
            array('id'=> 'voltaje1', 'valor' => $V1),
            array('id'=> 'voltaje2', 'valor' => $V2),
            array('id'=> 'corriente1', 'valor' => $A1),
            array('id'=> 'corriente2', 'valor' => $A2),
        );
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        //return new PrivateChannel('channel-name');
        return new PrivateChannel('prueba');
    }
}
