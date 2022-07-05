import React from "react";

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
    let porcentajeData = [];
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
    const datos = props.valoresPieChart;
    const [valores,setValores]=React.useState(porcentajes(datos));
    window.Echo.private('prueba').listen('ListenerLineElectricEvent',(e)=>{
        e.VoltajeyCorriente!=null?e.VoltajeyCorriente.map((elemento)=>{
            const tempbusqueda = datos.find((datobusqueda)=>datobusqueda.id===elemento.id);
            if(tempbusqueda){
                tempbusqueda.valor=elemento.valor;
            }
            return 0;
        }):null;
        
        const temp = [...datos];
        setValores(porcentajes(temp));
        //setMsg(e.msg);
    });
    return (
        <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            color:props.showLabel,
            fontSize:props.sizefont,
            fontWeight:500,
            width: props.size,
            height: props.size,
            margin:'auto',
            border:'solid 5px #B6B6B6',
            borderRadius: '50%',
            backgroundImage: 'radial-gradient(white 0% 50%, #B6B6B6 50% 55%, transparent 55%) , '+convertir_gradian_text(valores),
        }}>
            {datos!=null?(datos.find((e)=>e.primary===true)).valor:null}
        </div>
    );
}