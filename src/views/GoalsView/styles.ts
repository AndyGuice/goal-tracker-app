import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      // height: '250px'
    },
    button: {
      marginTop: 10,
      marginBottom: 10
    }
  }),
);
