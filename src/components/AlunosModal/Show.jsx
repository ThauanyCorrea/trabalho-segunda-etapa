import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import api from '../../services/api';

export default (props) => {
  const [aluno, setAluno] = useState();

  const classes = useStyles();

  useEffect(() => {
    fetchAluno();
  }, []);

  const fetchAluno = async () => {
    const response = await api.get(`/alunos/${props.id}`);
    setAluno(response.data[0]);
  };

  const handleGoBack = async () => {
    props.handleClose();
  };

  return (
    <Modal open={true} onClose={props.handleClose} className={classes.modal}>
      <Paper className={classes.paper}>
        {aluno && (
          <>
            <Typography
              className={classes.info}
              variant="h6"
            >{`${aluno.codigo} - ${aluno.nome}`}</Typography>
            <Typography
              className={classes.info}
              variant="h6"
            >{`${aluno.curso} - ${aluno.curso_nome}`}</Typography>
          </>
        )}
        <Button
          variant="contained"
          onClick={handleGoBack}
          color="primary"
          className={classes.button}
        >
          Voltar
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
  button: {
    marginTop: '1rem',
    width: '100%',
  },
  info: {
    width: '100%',
  },
}));
