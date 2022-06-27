import React from 'react';
import ReactDOM from 'react-dom';
import NavMain from './components/navMain/NavMain';
import '../../../css/main.css';
import PieChart from './components/dashboard/PieChart';

const styleMain = {
    width: '100%',
    height:'98vh',
}

const valoresPieChart = [
    {
        id:'voltaje',
        valor:50,
        color:'cyan'
    },
    {
        id:'voltaje',
        valor:80,
        color:'magenta'
    },
    ,
    {
        id:'voltaje',
        valor:20,
        color:'yellow'
    },
    {
        id:'voltaje',
        valor:10,
        color:'#8D4899'
    },
    {
        id:'voltaje',
        valor:10,
        color:'#486C99'
    }

];

function Index() {
    const [msg,setMsg] = React.useState('');
    window.Echo.private('prueba').listen('ListenerLineElectricEvent',(e)=>{
        setMsg(e.msg);
    });
    return (
        <div style={styleMain}>
            <NavMain></NavMain>
            <PieChart valoresPieChart={valoresPieChart}></PieChart>
        </div>
    );
}

export default Index;

if (document.getElementById('viewMain')) {
    ReactDOM.render(<Index />, document.getElementById('viewMain'));
}
