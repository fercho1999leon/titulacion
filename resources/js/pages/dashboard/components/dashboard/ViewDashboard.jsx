import React from "react";
import { Grid } from '@mui/material';
import { motion } from "framer-motion";
import PieChart from './PieChart';
import ViewLineOperation from "./ViewLineOperation";
import DiagramOfBars from "./DiagramOfBars";

const styleMain = {
    width: '98vw',
    height: '95vh',
}


const centrarHorizontal = {
    display: 'flex',
    justifyContent: 'center',
    color: 'var(--color-primary)'
}

const variantesCard = {
    init: {
        borderRadius: 15,
        boxShadow: '0px 0px 20px 5px rgb(0 0 0 / 40%)',
        padding: 5,
        textAlign: 'center',
    }
}

const valoresV1 = [
    {
        id: 'voltaje1',
        valor: 0,
        color: 'var(--color-primary)',
        primary: true
    },
    {
        id: 'v-max',
        valor: 240 - 0,
        color: 'var(--color-third)',
        primary: false
    }
];
const valoresV2 = [
    {
        id: 'voltaje2',
        valor: 0,
        color: 'var(--color-primary)',
        primary: true
    },
    {
        id: 'v-max',
        valor: 240 - 0,
        color: 'var(--color-third)',
        primary: false
    }
];
const valoresA1 = [
    {
        id: 'corriente1',
        valor: 0,
        color: 'var(--color-primary)',
        primary: true
    },
    {
        id: 'v-max',
        valor: 240 - 0,
        color: 'var(--color-third)',
        primary: false
    }
];
const valoresA2 = [
    {
        id: 'corriente2',
        valor: 0,
        color: 'var(--color-primary)',
        primary: true
    },
    {
        id: 'v-max',
        valor: 240 - 0,
        color: 'var(--color-third)',
        primary: false
    }
];

export default function ViewDashboard(props) {
    //const refV1 = React.useRef(valoresV1);
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            spacing={2}
        >
            <Grid
                item
                xs={12}
                sx={centrarHorizontal}
            >
                <h1 style={{
                    color: 'var(--color-primary)'
                }}>Dashboard</h1>
            </Grid>
            <Grid
                item
                xs={props.showNav ? 5 : 6}
                md={1}
                sx={centrarHorizontal}
            >
                <motion.div
                    initial={'init'}
                    variants={variantesCard}
                >
                    <h3>Valor de voltaje</h3>
                    <h3>Linea 1</h3>
                    <PieChart valoresPieChart={valoresV1} sizefont={'3.5vw'} size={'12vw'} showLabel={'var(--color-primary)'}></PieChart>
                </motion.div>
            </Grid>
            <Grid
                item
                xs={props.showNav ? 5 : 6}
                md={1}
                sx={centrarHorizontal}
            >
                <motion.div
                    initial={'init'}
                    variants={variantesCard}
                >
                    <h3>Valor de voltaje</h3>
                    <h3>Linea 2</h3>
                    <PieChart valoresPieChart={valoresV2} sizefont={'3.5vw'} size={'12vw'} showLabel={'var(--color-primary)'}></PieChart>
                </motion.div>
            </Grid>
            <Grid
                item
                xs={props.showNav ? 5 : 6}
                md={1}
                sx={centrarHorizontal}
            >
                <motion.div
                    initial={'init'}
                    variants={variantesCard}
                >
                    <h3>Valor de Corriente</h3>
                    <h3>Linea 1</h3>
                    <PieChart valoresPieChart={valoresA1} sizefont={'3.5vw'} size={'12vw'} showLabel={'var(--color-primary)'}></PieChart>
                </motion.div>
            </Grid>
            <Grid
                item
                xs={props.showNav ? 5 : 6}
                md={1}
                sx={centrarHorizontal}
            >
                <motion.div
                    initial={'init'}
                    variants={variantesCard}
                >
                    <h3>Valor de Corriente</h3>
                    <h3>Linea 2</h3>
                    <PieChart valoresPieChart={valoresA2} sizefont={'3.5vw'} size={'12vw'} showLabel={'var(--color-primary)'}></PieChart>
                </motion.div>
            </Grid>
            <Grid
                item
                xs={props.showNav ? 12 : 6}
                md={2.4}
                sx={centrarHorizontal}
            >
                <motion.div
                    initial={'init'}
                    variants={variantesCard}
                >
                    <h2>LINEAS OPERATIVAS</h2>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        spacing={3}
                    >
                        <Grid
                            item
                            xs={6}
                        >
                            <ViewLineOperation id={1} />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <ViewLineOperation id={2} />
                        </Grid>
                    </Grid>
                </motion.div>
            </Grid>
            <Grid
                item
                xs={11}
                sx={{
                    marginTop:'20px'
                }}
            >
                <motion.div
                    initial={'init'}
                    variants={variantesCard}
                >
                    <DiagramOfBars/>
                </motion.div>
            </Grid>
        </Grid>
    );
}