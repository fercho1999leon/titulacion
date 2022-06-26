import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { TextField } from "@mui/material";
import ButtonLoad from "../../../components/botones/ButtonLoad";

const style = {
    width: '30vw',
    height: 'auto',
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
    if ((data[5])['showMsg']) {
        (data[5])['setShowMsg'](false);
    }
    const $form = document.querySelector('form');
    if ($form.reportValidity()) {
        const $data = $form.elements;
        if (!data[0]) {
            data[2](false);
            data[1](true);
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            let arraydata = [];
            for (let i = 0; i < $data.length; i++) {
                if ($data[i].tagName === "INPUT") {
                    arraydata = [...arraydata, $data[i].value]
                }
            }
            let archivoDatos = {
                username: arraydata[0],
                password: arraydata[1],
            }
            archivoDatos = JSON.stringify(archivoDatos);
            fetch('/', {
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: archivoDatos,
            }).then(response => {
                return response.text();
            }).then(response => {
                try {
                    const res = JSON.parse(response);
                    data[2](true);
                    data[1](false);
                    if (res['code'] === 0) {
                        document.open();
                        document.write(response);
                        document.close();
                    } else {
                        (data[5])['setShowMsg'](true);
                    }
                } catch (error) {
                    document.open();
                    document.write(response);
                    document.close();
                }
            });
        }
    }
}

export default function FormLogin() {
    const [showMsg, setShowMsg] = React.useState(false);
    return (
        <Box sx={style}>
            <FormControl component="fieldset">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    component="form"
                    autoComplete="off"
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
                        <TextField className="SendData" sx={styleTextField} id="idUser" label="Usuario" variant="standard" required></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField className="SendData" sx={styleTextField} id="idPassword" label="Contraseña" variant="standard" required></TextField>
                    </Grid>
                    <Grid sx={{ alignSelf: 'center' }} item xs={12}>
                        <ButtonLoad EventOnClick={EventOnClick} text={'Iniciar Sesion'} parameteros={{ showMsg, setShowMsg }} />
                    </Grid>
                </Grid>
            </FormControl>
            {
                showMsg ?
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="filled" severity="info">
                            Usuario o contraseña incorrecto
                        </Alert>
                    </Stack> : <></>
            }
        </Box>
    );
}