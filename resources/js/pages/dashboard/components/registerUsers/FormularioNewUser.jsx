import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BotonAlerta(props) {
    const [typeMsg, setTypeMsg] = React.useState(true);
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    return (
        <Stack spacing={2} direction="row">
          <Button sx={styleBtn} variant="contained" onClick={(e)=>{
              onClickGuardar(props.id,handleClick,setTypeMsg,props.insertDataRows,props.update);
          }}>Guardar</Button>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={typeMsg?"success":"error"} sx={{ width: '100%' }}>
              {typeMsg?'INGRESO CORRECTO':'ERROR COMPLETE LOS CAMPOS'}
            </Alert>
          </Snackbar>
        </Stack>
    );
}

const onClickGuardar = (id,handleClick,setTypeMsg,insertDataRows,update) =>{
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const form = document.querySelector('form');
    const valid = form.reportValidity();
    if(valid){
        const arrayData = document.getElementsByClassName('dataNewUser');
        const name = arrayData[0].childNodes[1].childNodes[0].value;
        const email = arrayData[1].childNodes[1].childNodes[0].value;
        const username = arrayData[2].childNodes[1].childNodes[0].value;
        const password = arrayData[3].childNodes[1].childNodes[0].value;
        let archivoDatos={
            name,
            email,
            username,
            password,
            id
        }
        archivoDatos = JSON.stringify(archivoDatos);
        const url = '/user/'+(update?'update':'new');
        fetch(url,{
            headers:{
                'X-CSRF-TOKEN':token,
                'Content-Type':'application/json'
            },
            method:'POST',
            body:archivoDatos,
        }).then(res =>{
            return res.text();
        }).then(respuesta =>{
            try {
                const state = JSON.parse(respuesta);
                if(state['code']===0){
                    setTypeMsg(true);
                    handleClick();
                    insertDataRows(state['body']);
                }else if(state['code']===1){
                    setTypeMsg(false);
                    handleClick();
                }
            } catch (error) {
                setTypeMsg(false);
                handleClick();
            }
        });
    }
}

const styleBtn = {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '5px 20px',
    margin: '8px auto',
    borderRadius: '10px',
    backgroundColor: '#22376D',
    border: 'solid 2px var(--color-primary)',
    color: 'white',
    "&:hover":{
        backgroundColor: 'white',
        color: 'var(--color-primary)',
    }
};
export default function FormularioNewUser(props){
    /**
     * Recive como propiedades los campos del form
     * Recive propiedad update especifica si actualiza o se crea
     */

    const styleText = {
        width: '80%',
    }
    return (
        <div>
            <FormControl component="fieldset" >
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 6, md: 12 }}
                    component="form"
                    autoComplete="off"
                    sx={{
                        m: 1,textAlign: 'center',
                    }}
                >
                    <Grid item xs={12}>
                        <h3 style={{
                            color: 'var(--color-primary)',
                            marginTop:'10px'
                        }}>Registro de Usuarios en la plataforma</h3>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="idName" label="Nombre" defaultValue={props.name?props.name:null} variant="outlined" required/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="idEmail" label="Correo" defaultValue={props.email?props.email:null} variant="outlined" required/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="idUsername" label="Nombre de usuario" defaultValue={props.username?props.username:null} variant="outlined" required/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="idPass" label="Contraseña" variant="outlined" type="password" required/>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row" sx={{
                            justifyContent: 'center'
                        }}>
                            <BotonAlerta id={props.id} insertDataRows={props.insertDataRows} update={props.update}></BotonAlerta>
                        </Stack>
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    );
}
