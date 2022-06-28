import React from 'react';
import {createRoot} from 'react-dom/client';
import NavMain from './components/navMain/NavMain';
import '../../../css/main.css';
import ViewDashboard from './components/dashboard/ViewDashboard';

function Index() {
    return (
        <React.StrictMode>
            <NavMain></NavMain>
            <ViewDashboard></ViewDashboard>
        </React.StrictMode>
    );
}

export default Index;

if (document.getElementById('viewMain')) {
    createRoot(document.getElementById('viewMain')).render(<Index/>);
}
