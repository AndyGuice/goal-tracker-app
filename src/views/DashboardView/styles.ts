import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 10,
    },
    title: {
      display: 'flex',
      textAlign: 'center',
    },
    goalContainer: {
      justifyContent: "center",
    },
    goalGroupHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    goal: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 4,
      padding: 10,
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
    [theme.breakpoints.down("xs")]: {
      goal: {
        width: '100%',
        display: 'flex',
        textAlign: 'center',
      }
    },
  }),
);
