import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from "framer-motion"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const styleBtn = {
    marginTop:'5px',
    color: 'var(--color-fourth)',
    padding: '10px',
    fontWeight: 900,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '18px',
    cursor:'pointer',
    transition: "color 0.5s,background-color 0.5s",
    '&:hover':{
        backgroundColor: 'var(--color-fourth)',
        color: 'var(--color-primary)'
    }
}

const variantsBtn = {
    visible: {backgroundColor: 'var(--color-primary)', opacity: 1 },
    hidden: {backgroundColor: 'var(--color-primary)', opacity: 0 },
}

const arrayBtn = [
    {
        id: 1,
        text: 'Dashboard'
    },
    {
        id: 2,
        text: 'Configuracion'
    },
    {
        id: 3,
        text: 'Notificaciones'
    },
    {
        id: 4,
        text: 'Usuarios'
    }
];

export default function NavMain(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <Box
            sx={{
                width: isOpen ? "180px" : "50px",
                height: isOpen ? "96vh" : "50px",
                marginTop: '2vh',
                marginLeft: '2vh',
                backgroundColor: 'var(--color-primary)',
                borderRadius: isOpen ? "10px" : "50%",
                transition: isOpen ? "width 0.5s,height 0.5s" : "width 1s,height 0.6s, border-radius 0.5s 1s",
                color: 'white',
            }}
        >
            <Grid
                container
                direction="column"
                justifyContent="center"
            >
                <Grid item sx={{
                    width: "50px",
                    height: "50px",
                }}>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        sx={{
                            width: 'inherit',
                            height: "inherit",
                            padding: 0,
                            margin: 'auto',
                        }}
                        aria-label="menu"
                        onClick={(e) => {
                            setIsOpen(!isOpen);
                            props.setShowNav(!isOpen);
                        }}
                    >
                        {isOpen ?
                            <CloseRoundedIcon sx={{
                                color: 'var(--color-fourth)',
                            }} />
                            :
                            <MenuIcon sx={{
                                color: 'var(--color-fourth)',
                            }} />
                        }
                    </IconButton>
                </Grid>
                {isOpen ? arrayBtn.map((e, index) => (
                    <motion.button
                        key={index}
                        transition={{ delay: 0.6 }}
                        initial="hidden"
                        animate="visible"
                        variants={variantsBtn}
                    >
                        <Grid id={e['id']} item sx={styleBtn} onClick={(evento)=>{
                            props.setIdSelect(e['id']);
                        }}>
                            {e['text']}
                        </Grid>
                    </motion.button>
                ))
                    :
                    <></>}
            </Grid>
        </Box>
    );
}