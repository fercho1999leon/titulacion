import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField } from "@mui/material";
import ButtonLoad from "../../../components/botones/ButtonLoad";

const style = {
    width: '30vw',
    height: '45vh',
    flexGrow: 1,
    borderRadius: '10px',
    padding: '15px',
    WebkitBoxShadow: '0px 0px 56px 17px rgb(0 0 0 / 54%)',
}

const styleTextField = {
    width: '90%'
}
//Temporal (Loading for request of server)
const EventOnClick = (...data) => {
    if (!data[0]) {
        data[2](false);
        data[1](true);
        data[3].current = window.setTimeout(() => {
            data[2](true);
            data[1](false);
        }, 5000);
    }
}

export default function FormLogin() {
    return (
        <Box sx={style}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
            >
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <span style={
                        {
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 900,
                            fontSize: 'x-large',
                            color: 'var(--color-primary)',
                        }
                    }>SISTEMA DE CONTROL</span>
                </Grid>
                <Grid item xs={12}>
                    <TextField className="SendData" sx={styleTextField} id="idUser" label="Usuario" variant="standard"></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField className="SendData" sx={styleTextField} id="idPassword" label="Contraseña" variant="standard"></TextField>
                </Grid>
                <Grid sx={{ alignSelf: 'center' }} item xs={12}>
                    <ButtonLoad EventOnClick={EventOnClick} text={'Iniciar Sesion'} />
                </Grid>
            </Grid>
        </Box>
    );
}