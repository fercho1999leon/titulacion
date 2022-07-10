<?php

namespace App\Demon;

use Illuminate\Support\Facades\Artisan;

class DemonSocketServer
{
	public function start()
	{
		$socket = null;
		while (true) {
			try {
				$socket = stream_socket_server("tcp://192.168.2.13:5478", $errno, $errstr);
				if (!$socket) {
					echo "$errstr ($errno)<br />\n";
				} else {
					while ($conn = stream_socket_accept($socket)) {
						fwrite($conn, "\nBienvenido al Servidor De Prueba de PHP. \n");
						$datos = stream_get_contents($conn);
						if ($this->isJson($datos)) {
							$datos = json_decode($datos);
							Artisan::call('socketprivate:send "' . $datos->V1 . '" "' . $datos->V2 . '" "0" "0"');
							//$cmd = 'php artisan socketprivate:send "' . $datos->V1 . '" "' . $datos->V2 . '" "0" "0"';
							//exec('cd ' . dirname(__DIR__, 2) . '; ' . $cmd);
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
	private function isJson($string)
	{
		return ((is_string($string) && (is_object(json_decode($string)) || is_array(json_decode($string))))) ? true : false;
	}
}
