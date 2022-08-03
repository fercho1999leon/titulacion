import React from 'react';
import { createRoot } from 'react-dom/client';
import NavMain from './components/navMain/NavMain';
import '../../../css/main.css';
import ViewDashboard from './components/dashboard/ViewDashboard';
import ViewNotificaciones from './components/notificaciones/ViewNotificaciones';
import { Grid } from '@mui/material';
import FormNewUser from './components/registerUsers/FormNewUser';
import ViewConfig from './components/configurationview/ViewConfig';

function Index() {
    const [showNav,setShowNav] = React.useState(false);
    const [idSelect,setIdSelect] = React.useState(1);
    const selectView = () =>{
        if(idSelect === 1){
            return (<ViewDashboard showNav={showNav} />);
        }else if(idSelect === 2){
            return <ViewConfig></ViewConfig>;
        }
        else if(idSelect === 3){
            return <ViewNotificaciones />;
        }else{
            return <FormNewUser/>;
        }
    }
    return (
        <React.StrictMode>
            <Grid
                container
                direction="row"
                height='100vh'
            >
                <Grid
                    item
                    xs={'auto'}
                >
                    <NavMain setShowNav={setShowNav} setIdSelect={setIdSelect}></NavMain>
                </Grid>
                <Grid
                    item
                    xs
                >
                    {selectView()}
                </Grid>

            </Grid>
        </React.StrictMode>
    );
}

export default Index;

if (document.getElementById('viewMain')) {
    createRoot(document.getElementById('viewMain')).render(<Index />);
}
