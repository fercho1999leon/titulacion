import React from 'react';
import ReactDOM from 'react-dom';
import NavMain from './components/navMain/NavMain';
import '../../../css/main.css';
import ViewDashboard from './components/dashboard/ViewDashboard';

function Index() {
    return (
        <>
            <NavMain></NavMain>
            <ViewDashboard></ViewDashboard>
        </>
    );
}

export default Index;

if (document.getElementById('viewMain')) {
    ReactDOM.render(<Index />, document.getElementById('viewMain'));
}
