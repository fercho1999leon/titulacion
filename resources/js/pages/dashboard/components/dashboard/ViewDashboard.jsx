import React from "react";
import PieChart from './PieChart';

const styleMain = {
    width: '100%',
    height:'98vh',
}

export default function ViewDashboard(){
    const [msg,setMsg] = React.useState('');
    const [voltaje,setvoltaje] = React.useState(100);
    const valoresPieChart = [
        {
            id:'voltaje',
            valor:voltaje,
            color:'var(--color-primary)'
        },
        {
            id:'v-max',
            valor:240-voltaje,
            color:'var(--color-third)'
        }
    ];
    window.Echo.private('prueba').listen('ListenerLineElectricEvent',(e)=>{
        setvoltaje(e.msg);
        //setMsg(e.msg);
    });
    return (
        <div style={styleMain}>
            <PieChart valoresPieChart={valoresPieChart} size={180} showLabel={valoresPieChart.find((e)=>e.id==='voltaje')}></PieChart>
        </div>
    );
}