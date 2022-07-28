import React from "react";
import { Grid } from '@mui/material';

const centrarHorizontal = {
    display: 'flex',
    justifyContent: 'center',
    color: 'var(--color-primary)'
}

export default function ViewLineOperation(props) {
    const [line, setLine] = React.useState({v1:0,v2:0});
    window.Echo.private('prueba').listen('ListenerLineElectricEvent',(e)=>{
        let temp1 = 0, temp2 = 0;
        e.VoltajeyCorriente.map((elemento)=>{
            if(elemento["id"]==="voltaje1"){
                if(elemento["valor"]>20){
                    temp1 = 1;
                }
            }else if(elemento["id"]==="voltaje2"){
                if(elemento["valor"]>20){
                    temp2 = 2;
                }
            }
        })
        setLine({v1:temp1,v2:temp2});
    });
    const findline = (id) =>{
        if(line["v1"]===id){
            return true;
        }else if(line["v2"]===id){
            return true;
        }
        return false;
    
    }
    return (
        <Grid
            container
            direcction="column"
        >
            <Grid
                item
                xs={12}
                sx={centrarHorizontal}
            >
                <h3>
                    Linea {props.id}
                </h3>
            </Grid>
            <Grid
                item
                xs={12}
                sx={centrarHorizontal}
            >
                <div style={{
                    backgroundColor: findline(props.id) ? '#57D44D' : '#D44D4D',
                    borderRadius: '50%',
                    width: '100px',
                    height: '100px'
                }}>

                </div>
            </Grid>
        </Grid>
    );
}