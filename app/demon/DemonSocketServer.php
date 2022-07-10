<?php

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
				if (isJson($datos)) {
					$datos = json_decode($datos);
					exec('cd '.dirname(__DIR__, 2).'; php artisan socketprivate:send "'.$datos->v1.'" "'.$datos->v2.'" "0" "0"');
				}
				fclose($conn);
			}
			fclose($socket);
		}
	} catch (Exception $e) {
		if (!$socket) fclose($socket);
	}
}

function isJson($string)
{
	return ((is_string($string) && (is_object(json_decode($string)) || is_array(json_decode($string))))) ? true : false;
}
