import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import api from '../services/api';

import CreateModal from '../components/AlunosModal/Add';
import EditModal from '../components/AlunosModal/Edit';
import ShowModal from '../components/AlunosModal/Show';

export default () => {
  const [alunos, setAlunos] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editMoral, setEditMoral] = useState();
  const [showModal, setShowModal] = useState();
  const [snackState, setSnackState] = useState({
    isOpen: false,
    message: '',
    isError: false,
  });

  const classes = useStyles();

  useEffect(() => {
    fetchAlunos();
  }, [createModal, editMoral]);

  const fetchAlunos = async () => {
    const alunos = await api.get('/alunos');
    setAlunos(alunos.data);
  };

  const handleAddClick = () => {
    setCreateModal(true);
  };

  const handleCloseCreateModal = (success) => {
    setCreateModal(false);

    if (success) {
      setSnackState({
        isError: false,
        isOpen: true,
        message: 'Aluno criado com sucesso',
      });
    }
  };

  const handleCloseEditModal = (success) => {
    setEditMoral(null);

    if (success) {
      setSnackState({
        isError: false,
        isOpen: true,
        message: 'Aluno editado com sucesso',
      });
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/alunos/${id}`);
    setSnackState({
      isError: false,
      isOpen: true,
      message: 'Aluno deletado com sucesso',
    });
    fetchAlunos();
  };

  const handleEdit = async (id) => {
    setEditMoral(id);
  };

  const handleSnackClose = () => {
    setSnackState({
      ...snackState,
      isOpen: false,
    });
  };

  const handleShow = (id) => {
    setShowModal(id);
  };

  const handleCloseShowModal = () => {
    setShowModal(null);
  };

  return (
    <>
      <div className={classes.container}>
        <header className={classes.headerContainer}>
          <Typography variant="h5">Listagem de Alunos</Typography>
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddIcon />}
            onClick={handleAddClick}
          >
            Adicionar
          </Button>
        </header>
        {alunos && alunos.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Codigo</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Curso</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alunos.map(({ codigo, nome, curso }) => (
                  <TableRow key={codigo + nome + curso}>
                    <TableCell align="center">{codigo} </TableCell>
                    <TableCell align="center">{nome}</TableCell>
                    <TableCell align="center">{curso}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleShow(codigo)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(codigo)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(codigo)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <CreateModal isOpen={createModal} handleClose={handleCloseCreateModal} />
      {Boolean(editMoral) && (
        <EditModal id={editMoral} handleClose={handleCloseEditModal} />
      )}
      {Boolean(showModal) && (
        <ShowModal id={showModal} handleClose={handleCloseShowModal} />
      )}

      <Snackbar
        open={snackState.isOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={5000}
        onClose={handleSnackClose}
      >
        <MuiAlert
          onClose={handleSnackClose}
          severity={snackState.isError ? 'error' : 'success'}
        >
          {snackState.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 30,
    paddingLeft: '10rem',
    paddingRight: '10rem',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2rem',
  },
}));
