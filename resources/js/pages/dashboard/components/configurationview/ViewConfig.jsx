import * as React from 'react';
import Button from '@mui/material/Button';
import { Grid, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

//Tabla
import TableModel from '../registerUsers/TableModel';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Alert from '@mui/material/Alert';

const columnsModel = [
    { id: 'name', label: 'Nombre del Creador', minWidth: '10%' },
    { id: 'line', label: 'Linea Principal', minWidth: '10%' },
    { id: 'timeActionError', label: 'T. espera antes de recuperacion', minWidth: '10%' },
    { id: 'timeLastError', label: 'T. espera despues de evento', minWidth: '10%' },
    { id: 'email', label: 'Correo', minWidth: '10%' },
    { id: 'vmax', label: 'Voltaje max', minWidth: '10%' },
    { id: 'vmin', label: 'Voltaje min', minWidth: '10%' },
    { id: 'active', label: 'Activo', minWidth: '10%' },
    { id: 'action', label: 'Accion', minWidth: '10%' },
];

const rows = [
    {
        name: 'fernando',
        line: '1',
        timeActionError: '10',
        timeLastError: '15',
        email: 'fercho1999_w@hotmail.com',
        vmax: 120,
        vmin: 100,
        active: 'YES'

    }
];

const centrarHorizontal = {
    display: 'flex',
    justifyContent: 'center',
    color: 'var(--color-primary)'
}
const styleTextField = {
    width: '90%'
}

const theme = createTheme({
    typography: {
        fontFamily: 'Raleway, Arial',
        fontSize: 18,
    },
    palette: {
        primary: {
            main: '#123E66',
            darker: '#336666',
        },
        secondary: {
            main: "#FF5858",
            darker: "#336666"
        }
    },
});


export default function ViewConfig() {
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
    const [showMsg, setShowMsg] = React.useState(false);
    const [errorHTML, setErrorHTML] = React.useState(true);

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <motion.div
            transition={{ duration: 0.8 }}
            initial={{
                padding: '20px',
                boxShadow: '0px 0px 56px 17px rgb(0 0 0 / 30%)',
            }}
            animate={{
                scale: [0.6, 0.9],
                borderRadius: ["0px", "15px"],
            }}
        >

            <ThemeProvider theme={theme}>
                <Grid
                    container
                    direction='row'
                    justifyContent='space-evenly'
                    component="form"
                    autoComplete="off"
                    spacing={2}
                >
                    <Grid
                        item
                        xs={12}
                        sx={centrarHorizontal}
                    >
                        <h1>MENU DE CONFIGURACIÓN</h1>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <FormLabel id="demo-radio-buttons-group-label" color='primary'>ELIJA LINEA PRINCIPAL</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="1"
                            name="radio-buttons-group"
                            color='primary'
                        >
                            <FormControlLabel value="1" control={<Radio id="line1" />} label="LINEA 1" />
                            <FormControlLabel value="2" control={<Radio id="line2" />} label="LINEA 2" />
                        </RadioGroup>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <TextField sx={styleTextField} id={'idEmail'} label={'Ingrese correo de notificacion'} variant="standard" color='primary'></TextField>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <TextField
                            id="timeActionError"
                            label="Tiempo de respuesta en minutos"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            color='primary'
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <TextField
                            id="timeLastError"
                            label="Tiempo cambio despues de fallo"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            color='primary'
                        />

                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <TextField
                            id="vmax"
                            label="Voltaje max permitido"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            color='primary'
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <TextField
                            id="vmin"
                            label="Voltaje min permitido"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            color='primary'
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                    >
                        <Button variant="contained" color='primary' onClick={(e) => {
                            saveData(showMsg, setShowMsg, setErrorHTML);
                        }}>Guardar</Button>
                    </Grid>
                    {
                        showMsg ?
                            <Grid
                                item
                                xs={12}
                            >
                                {
                                    ShowAlert()
                                }
                            </Grid>
                            :
                            null
                    }
                    <iframe hidden={errorHTML} style={{ width: '100%', height: '400px' }} id='saveDataError'></iframe>
                    <Grid
                        item
                        xs={12}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '2px',
                                backgroundColor: 'var(--color-primary)',
                            }}
                        >
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <LoadTable></LoadTable>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '2px',
                                backgroundColor: 'var(--color-primary)',
                            }}
                        >
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DateTimePicker
                                    label="Fecha y tiempo del simulacro"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <Button variant="contained" color='secondary'>START</Button>
                    </Grid>
                </Grid>
            </ThemeProvider>

        </motion.div>
    );
}

const saveData = (showMsg, setShowMsg, setErrorHTML) => {
    if (showMsg) {
        setShowMsg(false);
    }
    const $form = document.querySelector('form');
    if ($form.reportValidity()) {
        const $data = $form.elements;
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        let arraydata = {
            line: $data.line1.checked ? 1 : 2,
            timeActionError: $data.timeActionError.value,
            timeLastError: $data.timeLastError.value,
            email: $data.idEmail.value,
            vmax: $data.vmax.value,
            vmin: $data.vmin.value,
        };
        arraydata = JSON.stringify(arraydata);
        fetch('/config/create', {
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json'

            },
            method: 'POST',
            body: arraydata
        }).then(res => {
            return res.text();
        }).then(res => {
            try {
                JSON.parse(res);
                setErrorHTML(true);
                setShowMsg(true);
            } catch (error) {
                const $div = document.getElementById('saveDataError');
                $div.contentWindow.document.open();
                $div.contentWindow.document.write(res);
                $div.contentWindow.document.close();
                setErrorHTML(false);
            }
        });


    }

}

const importData = (insertDataRows, setErrorHTML) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    fetch('/config/read', {
        headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then(res => {
        return res.text();
    }).then(res => {
        try {
            const data = JSON.parse(res);
            setErrorHTML(true);
            insertDataRows(data);
        }
        catch (error) {
            const $div = document.getElementById('insertTable');
            $div.contentWindow.document.open();
            $div.contentWindow.document.write(res);
            $div.contentWindow.document.close();
            setErrorHTML(false);
        }
    });

}

function createData(name, line, timeActionError, timeLastError, email, vmax, vmin, active, action) {
    return { name, line, timeActionError, timeLastError, email, vmax, vmin, active, action };
}

const delectUser = (insertDataRows, id, setErrorHTML) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let archivoDatos = {
        id,
    }
    archivoDatos = JSON.stringify(archivoDatos);
    fetch('/config/delect', {
        headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: archivoDatos,
    }).then(res => {
        return res.text();
    }).then(res => {
        try {
            const data = JSON.parse(res);
            setErrorHTML(true);
            insertDataRows(data);
        }
        catch (error) {
            const $div = document.getElementById('insertTable');
            $div.contentWindow.document.open();
            $div.contentWindow.document.write(res);
            $div.contentWindow.document.close();
            setErrorHTML(false);
        }
    });
}

const LoadTable = () => {
    const [rows, setRows] = React.useState([]);
    const [errorHTML, setErrorHTML] = React.useState(true);

    window.Echo.private('updatedbconfig').listen('ListenerDbConfig',(e)=>{
        e.data;
        console.log(e.data);
    });

    const insertDataRows = (data) => {
        const arrayData = [];
        data.map((el) => {
            const name = el['user_create'];
            const config = el['configuracion'];
            arrayData.push(createData(name, config['line'], config['timeActionError'], config['timeLastError'],
                config['email'], config['vmax'], config['vmin'], config['active'],
                <>
                    <IconButton onClick={(e) => {
                        delectUser(insertDataRows, config['id'], setErrorHTML);
                    }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ))
        });
        setRows(arrayData);
    }
    React.useEffect(() => {
        importData(insertDataRows, setErrorHTML);
    }, []);
    //<TableModel columns={columnsModel} rows={rows} xs={11}></TableModel>
    return (
        <>
            {errorHTML ? <TableModel columns={columnsModel} rows={rows} xs={11}></TableModel> : null}
            <iframe hidden={errorHTML} style={{ width: '100%', height: '400px' }} id='insertTable'></iframe>
        </>

    );
}

const ShowAlert = () => {
    return (
        <motion.div
            transition={{ duration: 0.6 }}
            animate={{
                scale: [0, 1],
            }}
        >
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="info">
                    Configuracion ingresada correctamente
                </Alert>
            </Stack>
        </motion.div>
    );
}