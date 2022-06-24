import React from "react";
import { Box,Grid,TextField } from "@mui/material";
import ButtonLoad from "../botones/ButtonLoad";

const styleTextField = {
    width: '90%'
}

const style = {
    width: '50vw',
    height: 'auto',
    flexGrow: 1,
    borderRadius: '10px',
    padding: '15px',
    WebkitBoxShadow: '0px 0px 56px 17px rgb(0 0 0 / 54%)',
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

export default function FormCreateUsers(props){
    
    return (
        <Box sx={props.enableWindows?style:{}}>
            <Grid
                container
                justifyContent="center"
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
                    }>REGISTRO DE USUARIO</span>
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField sx={styleTextField} id="idUser" label="Nombre" variant="outlined"></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField sx={styleTextField} id="idUser" label="Correo" variant="outlined"></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField sx={styleTextField} id="idUser" label="Usuario" variant="outlined"></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField sx={styleTextField} id="idUser" label="Contraseña" variant="outlined"></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField sx={styleTextField} id="idUser" label="Repita Contraseña" variant="outlined"></TextField>
                </Grid>
                <Grid item xs={12}>
                    <span style={{ 
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                    ><ButtonLoad EventOnClick={EventOnClick} text={'Guardar'}/></span>
                </Grid>
            </Grid>
        </Box>
    );
}