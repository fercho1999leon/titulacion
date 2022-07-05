import React from 'react';
import { createRoot } from 'react-dom/client';
import NavMain from './components/navMain/NavMain';
import '../../../css/main.css';
import ViewDashboard from './components/dashboard/ViewDashboard';
import { Grid } from '@mui/material';

function Index() {
    const [showNav,setShowNav] = React.useState(false);
    return (
        <React.StrictMode>
            <Grid
                container
                direction="row"
            >
                <Grid
                    item
                    xs={'auto'}
                >
                    <NavMain setShowNav={setShowNav}></NavMain>
                </Grid>
                <Grid
                    item
                    xs
                >
                    <ViewDashboard showNav={showNav}></ViewDashboard>
                </Grid>

            </Grid>
        </React.StrictMode>
    );
}

export default Index;

if (document.getElementById('viewMain')) {
    createRoot(document.getElementById('viewMain')).render(<Index />);
}
