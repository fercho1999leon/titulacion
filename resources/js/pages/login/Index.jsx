import React from 'react';
import ReactDOM from 'react-dom';
import FormLogin from './components/FormLogin';
import FormCreateUsers from '../../components/moduloUsuarios/FormCreateUsers';
import '../../../css/main.css';

const style = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

function Index() {
    return (
        <div className="container" style={style}>
            <div>
                <FormCreateUsers enableWindows={true}/>
            </div>
        </div>
    );
}

export default Index;

if (document.getElementById('viewLogin')) {
    ReactDOM.render(<Index />, document.getElementById('viewLogin'));
}
