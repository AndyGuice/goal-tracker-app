import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    goalContainer: {
      flexGrow: 1,
    },
    loadingPaper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '75vh',
      width: '100%',
      marginTop: '20px'
    },
    goalGroupHeader: {
    },
    title: {
      fontSize: 10,
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    alert: {
      backgroundColor: '#f50060',
    },
    [theme.breakpoints.down("xs")]: {
    },
  }),
);
