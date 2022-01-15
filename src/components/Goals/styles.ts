import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    loadingPaper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '4px',
      height: '75vh',
      width: '100%',
      marginTop: '20px'
    },
    title: {
      fontSize: 14,
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1)
    },
    alert: {
      backgroundColor: '#f50060',
    },
  }),
);
