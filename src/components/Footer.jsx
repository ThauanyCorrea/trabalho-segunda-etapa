import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export default () => {
  const classes = useStyles();

  return (
    <footer className={classes.container}>
      <Typography align="center" variant="h6" color="inherit">
        Thauany Martins - All Rights Reserved.
      </Typography>
    </footer>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    height: 100,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
}));
