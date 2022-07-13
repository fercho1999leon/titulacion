import React from "react";
import { Grid } from '@mui/material';

const centrarHorizontal = {
    display: 'flex',
    justifyContent: 'center',
    color: 'var(--color-primary)'
}

export default function ViewLineOperation(props) {
    const [line, setLine] = React.useState(1);
    /*window.Echo.private('LOperation').listen('ListenerLineOperation', (e) => {
        e.LineOperation ? setLine(e.LineOperation) : null;
    });*/
    return (
        <Grid
            container
            direcction="column"
        >
            <Grid
                item
                xs={12}
                sx={centrarHorizontal}
            >
                <h3>
                    Linea {props.id}
                </h3>
            </Grid>
            <Grid
                item
                xs={12}
                sx={centrarHorizontal}
            >
                <div style={{
                    backgroundColor: line === props.id ? '#57D44D' : '#D44D4D',
                    borderRadius: '50%',
                    width: '100px',
                    height: '100px'
                }}>

                </div>
            </Grid>
        </Grid>
    );
}