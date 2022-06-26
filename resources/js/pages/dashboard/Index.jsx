import React from 'react';
import ReactDOM from 'react-dom';

function Index() {
    const [msg,setMsg] = React.useState('');
    window.Echo.private('prueba').listen('ListenerLineElectricEvent',(e)=>{
        setMsg(e.msg);
    });
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
                            El mensaje del servidor es: {msg}
                        <div className="card-body">DASHBOARD</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;

if (document.getElementById('viewMain')) {
    ReactDOM.render(<Index />, document.getElementById('viewMain'));
}
