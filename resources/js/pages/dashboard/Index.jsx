import React from 'react';
import ReactDOM from 'react-dom';
import NavMain from './components/navMain/NavMain';
import '../../../css/main.css';
import PieChart from './components/dashboard/PieChart';

const styleMain = {
    width: '100%',
    height:'98vh',
}

function Index() {
    const [msg,setMsg] = React.useState('');
    const [voltaje,setvoltaje] = React.useState(100);
    const valoresPieChart = [
        {
            id:'voltaje',
            valor:voltaje,
            color:'var(--color-primary)'
        },
        {
            id:'voltaje',
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
            <NavMain></NavMain>
            <PieChart valoresPieChart={valoresPieChart} size={200}></PieChart>
        </div>
    );
}

export default Index;

if (document.getElementById('viewMain')) {
    ReactDOM.render(<Index />, document.getElementById('viewMain'));
}
