import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    loadingPaper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '75vh',
      width: '100%',
      marginTop: '20px'
    },
    title: {
      fontSize: 10,
    },
    paper: {
      display: 'flex',
      flexDirection: 'row',
      // padding: theme.spacing(2),
    },
    button: {
      margin: 10,
    },
    alert: {
      backgroundColor: '#f50060',
    },
    [theme.breakpoints.down("xs")]: {
    },
  }),
);
