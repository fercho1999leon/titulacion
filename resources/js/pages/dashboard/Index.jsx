import React from 'react';
import ReactDOM from 'react-dom';
import NavMain from './components/navMain/NavMain';
import '../../../css/main.css';

const styleMain = {
    width: '100%',
    height:'98vh',
}

function Index() {
    const [msg,setMsg] = React.useState('');
    window.Echo.private('prueba').listen('ListenerLineElectricEvent',(e)=>{
        setMsg(e.msg);
    });
    return (
        <div style={styleMain}>
            <NavMain></NavMain>
        </div>
    );
}

export default Index;

if (document.getElementById('viewMain')) {
    ReactDOM.render(<Index />, document.getElementById('viewMain'));
}
