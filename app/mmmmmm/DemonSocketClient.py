import socket
import time
import RPi.GPIO as GPIO
import json

GPIO.setmode(GPIO.BCM)
GPIO.setup(24, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setwarnings(False)

SData = json.dumps({"V1": 50, "V2": 100, "A1":50, "A2":100})

while True:
    mi_socket = None
    try:
        mi_socket = socket.socket()
        mi_socket.connect(('192.168.2.13', 5478))
        Status = GPIO.input(24)
        if Status == False:
            byt = SData.encode()
            mi_socket.send(byt)
        #-----------------------------------------------
        resp = mi_socket.recv(1024)
        print (resp)
        #st='Hola desde el cliente \n'
        #byt=st.encode()
        #mi_socket.send(byt);
        mi_socket.close()
        time.sleep(0.3)
    except:
        if mi_socket is not None:
            mi_socket.close()