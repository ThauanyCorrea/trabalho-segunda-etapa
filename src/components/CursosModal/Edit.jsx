import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import api from '../../services/api';

export default (props) => {
  const [nome, setNome] = useState('');
  const classes = useStyles();

  useEffect(() => {
    fetchCurso();
  }, []);

  const fetchCurso = async () => {
    const response = await api.get(`/cursos/${props.id}`);

    setNome(response.data[0].nome);
  };

  const handleChangeNome = (event) => {
    setNome(event.target.value);
  };

  const handleEdit = async () => {
    const response = await api.put('/cursos', {
      codigo: props.id,
      nome: nome,
    });
    props.handleClose(true);
  };

  return (
    <Modal open={true} onClose={props.handleClose} className={classes.modal}>
      <Paper className={classes.paper}>
        <TextField
          label="Codigo"
          variant="outlined"
          value={props.id}
          disabled
          className={classes.codigo}
        />
        <TextField
          label="Nome"
          variant="outlined"
          value={nome}
          onChange={handleChangeNome}
          required
          className={classes.name}
        />
        <Button
          variant="contained"
          onClick={handleEdit}
          color="primary"
          className={classes.button}
        >
          Salvar
        </Button>
      </Paper>
    </Modal>
  );
};

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    padding: '2rem',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 300,
  },
  codigo: {
    width: '100%',
  },
  name: {
    width: '100%',
    marginTop: '1rem',
  },
  button: {
    marginTop: '1rem',
    width: '100%',
  },
}));
