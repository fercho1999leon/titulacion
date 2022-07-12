import React from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';

const opciones = {
    maintainAspectRatio: false,
    responsive:true
}

export default function DiagramOfBars(){
    const [dataForBars,setDataForBars] = useState([8,0,0,1,0,0,4,0,5,0,0,12]);
    ChartJS.register(...registerables);
    const data = {
        labels:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets:[{
            label:'Fallas',
            backgroundColor:'rgba(212,77,77,0.9)',
            borderColor:'white',
            borderWidth:'1',
            hoverBackgroundColor:'rgba(255,132,132,0.9)',
            hoverBorderColor:'white',
            data:dataForBars,
        }]
    }


    return (
        <div style={{
            width:'100%',
            height:'200px'
        }}>
            <Bar data={data} options={opciones}/>
        </div>
    );
}