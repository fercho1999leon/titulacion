<?php

namespace App\Demon;

use App\Events\ListenerLineElectricEvent;

class DemonSocketServer
{
	public static function start()
	{
		$socket = null;
		while (true) {
			try {
				$socket = stream_socket_server("tcp://144.126.143.111:5478", $errno, $errstr);
				if (!$socket) {
					echo "$errstr ($errno)<br />\n";
				} else {
					while ($conn = stream_socket_accept($socket)) {
						fwrite($conn, "\nBienvenido al Servidor De Prueba de PHP. \n");
						$datos = stream_get_contents($conn);
						if (DemonSocketServer::isJson($datos)) {
							$datos = json_decode($datos);
							event(new ListenerLineElectricEvent($datos->V1,$datos->V2,$datos->A1,$datos->A2));
						}
						fclose($conn);
					}
					fclose($socket);
				}
			} catch (\Exception $e) {
				if (!$socket) fclose($socket);
			}
		}
	}
	private static function isJson($string)
	{
		return ((is_string($string) && (is_object(json_decode($string)) || is_array(json_decode($string))))) ? true : false;
	}
}
