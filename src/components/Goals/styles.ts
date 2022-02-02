import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    title: {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 10,
        fontSize: '1rem',
      },
    },
    paper: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(1),
      width: "75%",
      [theme.breakpoints.down("sm")]: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: "100%",
      }
    },
    alert: {
      backgroundColor: '#f50060',
    },
    [theme.breakpoints.down("xs")]: {
    },
  }),
);
