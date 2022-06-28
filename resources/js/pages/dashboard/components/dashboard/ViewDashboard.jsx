import React from "react";
import PieChart from './PieChart';

const styleMain = {
    width: '100%',
    height:'98vh',
}

export default function ViewDashboard(){
    const [msg,setMsg] = React.useState('');
    const valoresPieChart = [
        {
            id:'voltaje',
            valor:0,
            color:'var(--color-primary)'
        },
        {
            id:'v-max',
            valor:240-0,
            color:'var(--color-third)'
        }
    ];
    return (
        <div style={styleMain}>
            <PieChart valoresPieChart={valoresPieChart} size={180} showLabel={valoresPieChart.find((e)=>e.id==='voltaje')}></PieChart>
        </div>
    );
}