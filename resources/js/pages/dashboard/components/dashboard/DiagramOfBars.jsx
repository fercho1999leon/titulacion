import React, { useEffect } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';

const opciones = {
    maintainAspectRatio: false,
    responsive:true
}

const importData = (year,insertData) =>{
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    fetch('/date/dataofbars',{
        headers:{
            'X-CSRF-TOKEN':token,
            'Content-Type':'application/json',
        },
        method:'POST',
        body:JSON.stringify({
            year
        })
    }).then(res => {
        return res.text();
    }).then(res =>{
        try {
            const data = JSON.parse(res);
            insertData(data);
        } catch (error) {
            document.open();
            document.write(res);
            document.close();
        }
    });

}

export default function DiagramOfBars(){
    const [dataForBars,setDataForBars] = useState([]);
    useEffect(()=>{
        importData(new Date(Date.now()).getFullYear(),insertData);
    },[]);
    const insertData=(data)=>{
        const arreglo = data.map((e)=>{
            return e['count'];
        });
        setDataForBars(arreglo);
    }
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