import React from 'react';
import ReactDOM from 'react-dom';
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
        <div id="container" style={style}>
            <div>
                <FormCreateUsers enableWindows={true}/>
            </div>
        </div>
    );
}

export default Index;

if (document.getElementById('viewFormCreateUsers')) {
    ReactDOM.render(<Index />, document.getElementById('viewFormCreateUsers'));
}
