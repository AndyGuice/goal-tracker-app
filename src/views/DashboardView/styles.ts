import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 10,
    },
    goalContainer: {
      justifyContent: "center",
      paddingTop: 15,
    },
    goalGroupHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 4,
    },
    goal: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 4,
      padding: 10,
      minWidth: 250,
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
  }),
);
