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
        secondary:{
            main: "#FF5858",
            darker: "#336666"
        }
    },
});


export default function ViewConfig() {
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <motion.div
            transition={{ duration: 0.8 }}
            initial={{
                marginTop: '25px',
                padding: '20px',
                boxShadow: '0px 0px 56px 17px rgb(0 0 0 / 30%)',
            }}
            animate={{
                scale: [0.6, 0.8],
                borderRadius: ["0px", "15px"],
            }}
        >
            <ThemeProvider theme={theme}>
                <Grid
                    container
                    direction='row'
                    justifyContent='space-evenly'
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
                            <FormControlLabel value="1" control={<Radio />} label="LINEA 1" />
                            <FormControlLabel value="2" control={<Radio />} label="LINEA 2" />
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
                        <Button variant="contained" color='primary'>Guardar</Button>
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