import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";

/*Este componente recibe 3 propiedades
    1. Evento a ejecutar al ingresar al componete regresa con 6 parametrps (EventOnClick)
        1.1 loading, setLoading, setSuccess, timer, e, props.parameteros 
    2. Leabel del boton (text)
    3. Parametros adicionales para el eventos (Opcional) (parameteros)
*/
export default function ButtonLoad(props) {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const buttonSx = {
        backgroundColor: 'var(--color-third)',
        color: 'var(--color-fourth)',
        "&:hover": {
            backgroundColor: 'var(--color-fourth)',
            color: 'var(--color-third)',
            border: 'solid 1px var(--color-third)',
        }
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    /*const handleButtonClick = () => {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, 2000);
      }
    };*/

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ m: 1, position: "relative" }}>
                <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={(e) => {
                        props.EventOnClick(loading, setLoading, setSuccess, timer, e, props.parameteros);
                    }}
                >
                    {props.text}
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: green[500],
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-12px",
                            marginLeft: "-12px"
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}