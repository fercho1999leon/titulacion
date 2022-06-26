import React from "react";
import { Box, Grid, TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ButtonLoad from "../botones/ButtonLoad";
import FormControl from '@mui/material/FormControl';

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
    if((data[5])['showMsg']){
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
            if(arraydata[3]===arraydata[4]){
                let archivoDatos = {
                    name: arraydata[0],
                    email: arraydata[1],
                    username: arraydata[2],
                    password: arraydata[3],
                }
                archivoDatos = JSON.stringify(archivoDatos);
                fetch('/new-user', {
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
                            window.location.reload();
                        }
                    } catch (error) {
                        document.open();
                        document.write(response);
                        document.close();
                    }
                });
            }else{
                data[2](true);
                data[1](false);
                (data[5])['setShowMsg'](true);
            }
        }
    }
}

export default function FormCreateUsers(props) {
    const [showMsg, setShowMsg] = React.useState(false);

    return (
        <Box sx={props.enableWindows ? style : {}}>
            <FormControl component="fieldset">
                <Grid
                    container
                    component="form"
                    autoComplete="off"
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
                        <TextField className="DataForm" sx={styleTextField} label="Nombre" variant="outlined" required></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField className="DataForm" sx={styleTextField} label="Correo" variant="outlined" required></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField className="DataForm" sx={styleTextField} label="Usuario" variant="outlined" required></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField className="DataForm" type="password" sx={styleTextField} label="Contraseña" variant="outlined" required></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField className="DataForm" type="password" sx={styleTextField} label="Repita Contraseña" variant="outlined" required></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <span style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                        ><ButtonLoad EventOnClick={EventOnClick} text={'Guardar'} parameteros={{showMsg,setShowMsg}}/></span>
                    </Grid>
                </Grid>
                {
                    showMsg ?
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="filled" severity="warning">
                                Las contraseñas ingresadas no coinciden
                            </Alert>
                        </Stack>:<></>
                }
            </FormControl>
        </Box>
    );
}