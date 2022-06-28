import React from 'react';
import { createRoot } from 'react-dom/client';
import FormLogin from './components/FormLogin';
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
        <React.StrictMode>
            <div className="container" style={style}>
                <div>
                    <FormLogin />
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Index;

if (document.getElementById('viewLogin')) {
    createRoot(document.getElementById('viewLogin')).render(<Index />);
}
