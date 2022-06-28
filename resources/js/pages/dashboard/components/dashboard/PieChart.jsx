import React from "react";

const stylePieChart = {
    backgroundImage: 'conic-gradient(#000)'
}

const porcentajes = (array) => {
    const total = calcular_ni(array);
    return(calcular_fi(array,total));
}

const calcular_ni = (array) => {
    let sumatoria = 0;
    //metodo de ordenamiento
    /*array.sort((a, b) => {
        if (a.valor > b.valor) {

        }
        if (a.valor < b.valor) {
            return -1;
        }
        return 0;
    });*/
    array.map((e)=>{
        sumatoria = sumatoria + e.valor;
    });
    return(sumatoria);
}

const calcular_fi = (array,total) => {
    let porcentajeData = []
    array.map((e)=>{
        porcentajeData = [...porcentajeData,{
            id:e.id,
            valor:((e.valor/total)*100),
            color:e.color
        }];
    });
    return (porcentajeData);
}

const convertir_gradian_text = (array) =>{
    let text = 'conic-gradient(';
    let valoranterior = 0;
    array.map((e,Index)=>{
        text = text+e.color+' '+(Index===0?'0':valoranterior)+'%'+' '+(valoranterior+e.valor)+'%'+(array.length-1 === Index?'':' , ');
        valoranterior=valoranterior+e.valor;
    });
    text = text+')';
    return (text);
}

export default function PieChart(props) {
    const valores=porcentajes(props.valoresPieChart);
    return (
        <div style={{
            width: props.size,
            height: props.size,
            borderRadius: '50%',
            marginLeft: '100px',
            backgroundImage: 'radial-gradient(white 55%, transparent 55%) , '+convertir_gradian_text(valores),
        }}>
        </div>
    );
}