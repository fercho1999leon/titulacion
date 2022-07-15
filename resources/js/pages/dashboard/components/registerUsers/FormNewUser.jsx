import * as React from 'react';
import Grid from '@mui/material/Grid';
import Edit from '@mui/icons-material/Edit';
import TableModel from './TableModel';
import VtnModalModel from './VtnModalModel';
import FormularioNewUser from "./FormularioNewUser";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function VtnModalEdit(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
        <IconButton onClick={handleOpen}>
            <Edit />
        </IconButton>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {props.component}
            </Box>
        </Modal>
    </>
  );
}

function createData(name, username, email , action) {
    return { name, username, email , action };
}
const columnsModel = [
    { id: 'name', label: 'Nombre', minWidth: '10%' },
    { id: 'username', label: 'Usuario', minWidth: '10%' },
    { id: 'email', label: 'correo', minWidth: '10%' },
    { id: 'action', label: 'Edicion', minWidth: '10%' }
];
const importData = (insertDataRows) =>{
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    fetch('/user/import',{
        headers:{
            'X-CSRF-TOKEN':token,
            'Content-Type':'application/json',
        },
        method:'POST',
    }).then(res => {
        return res.text();
    }).then(res =>{
        try {
            const data = JSON.parse(res);
            insertDataRows(data);
        } catch (error) {
            document.open();
            document.write(res);
            document.close();
        }
    });

}

const delectUser = (insertDataRows,id) =>{
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let archivoDatos={
        id,
    }
    archivoDatos = JSON.stringify(archivoDatos);
    fetch('/user/delete',{
        headers:{
            'X-CSRF-TOKEN':token,
            'Content-Type':'application/json',
        },
        method:'POST',
        body:archivoDatos,
    }).then(res => {
        return res.text();
    }).then(res =>{
        try {
            const data = JSON.parse(res);
            insertDataRows(data);
        } catch (error) {
            document.open();
            document.write(res);
            document.close();
        }
    });
}
export default function FormNewUser(){
    const [rows,setRows] = React.useState([]);
    const insertDataRows = (data) =>{
        const arrayData = [];
        data.map((el)=>{
            arrayData.push(createData(el['name'], el['username'], el['email'],
                <>
                    <VtnModalEdit component={<FormularioNewUser update={true} insertDataRows={insertDataRows} id={el['id']} name={el['name']} email={el['email']} username={el['username']}/>} />
                    <IconButton onClick={(e)=>{
                        delectUser(insertDataRows,el['id']);
                    }}>
                        <DeleteIcon/>
                    </IconButton>
                </>
            ))
        });
        setRows(arrayData);
    }
    React.useEffect(()=>{
        importData(insertDataRows);
    },[]);
    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 6, md: 12 }}
                sx={{
                    m: 1,textAlign: 'center',
                }}
            > 
                <Grid item xs={12}>
                    <h2 style={{
                            color: 'var(--color-primary)',
                            marginTop:'10px'
                    }}>Usuarios de la plataforma</h2>
                </Grid>
                <Grid item xs={4}>
                    <VtnModalModel title={'NUEVO USUARIO'} component={<FormularioNewUser update={false} insertDataRows={insertDataRows} ></FormularioNewUser>}></VtnModalModel>
                </Grid>
                <Grid item xs={11} sx={{
                    m: 'auto'
                }}>
                    <TableModel  columns={columnsModel} rows={rows} xs={11}></TableModel>
                </Grid>
            </Grid>
        </>
    );
}