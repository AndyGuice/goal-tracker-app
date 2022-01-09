import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    alert: {
      backgroundColor: '#f50057',
    },
    loadingPaper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '15px',
      height: '39vh',
      marginTop: '1rem'
    },
    underline: {
      '&::after': {
        border: '2px solid #3f51b5',
        width: '300px',
        marginLeft: '30px'
      },
      '&::before': {
        borderBottom: '2px solid #3f51b5',
        width: '300px',
        marginLeft: '30px'
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);
