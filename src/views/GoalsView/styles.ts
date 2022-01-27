import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      // height: '250px'
    },
    loadingPaper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '75vh',
    },
    title: {
      fontSize: 14,
    },
  }),
);
