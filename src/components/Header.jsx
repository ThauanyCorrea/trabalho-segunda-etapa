import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';

export default () => {
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();

  const toggleDrower = () => {
    setDrawer(!drawer);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" onClick={toggleDrower}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Trabalho 2º Etapa</Typography>
        <Drawer anchor="left" open={drawer} onClose={toggleDrower}>
          <List className={classes.drawer}>
            <Link to="/alunos" onClick={toggleDrower}>
              <ListItem button>
                <ListItemText>Alunos</ListItemText>
              </ListItem>
            </Link>
            <Link to="/cursos" onClick={toggleDrower}>
              <ListItem button>
                <ListItemText>Cursos</ListItemText>
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(() => ({
  drawer: {
    width: 250,
    '& a': {
      textDecoration: 'none',
      color: 'initial',
    },
  },
}));
