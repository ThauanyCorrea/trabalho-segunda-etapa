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
  const [cursos, setCursos] = useState([]);
  const [cursoSelecionado, setCursoSelecionado] = useState();
  const [nome, setNome] = useState('');
  const classes = useStyles();

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    const response = await api.get('/cursos');
    setCursos(response.data);
  };

  const handleChangeCurso = (event) => {
    setCursoSelecionado(event.target.value);
  };

  const handleChangeNome = (event) => {
    setNome(event.target.value);
  };

  const handleSave = async () => {
    const response = await api.post('/alunos', {
      nome: nome,
      curso: cursoSelecionado,
    });
    props.handleClose(true);
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleClose}
      className={classes.modal}
    >
      <Paper className={classes.paper}>
        <TextField
          label="Nome"
          variant="outlined"
          value={nome}
          onChange={handleChangeNome}
          required
          className={classes.name}
        />
        <FormControl variant="outlined" className={classes.select} required>
          <InputLabel id="select-curso-labe">Curso</InputLabel>
          <Select
            labelId="select-curso-label"
            id="select-curso"
            onChange={handleChangeCurso}
            value={cursoSelecionado}
            label="Curso"
            required
          >
            {cursos?.map((curso) => (
              <MenuItem value={curso.codigo}>{curso.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleSave}
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
  name: {
    width: '100%',
  },
  select: {
    marginTop: '1rem',
    width: '100%',
  },
  button: {
    marginTop: '1rem',
    width: '100%',
  },
}));
