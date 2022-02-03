import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      border: '1px solid black',
      width: "60%",
      [theme.breakpoints.down("sm")]: {
        width: "90%"
      }
    },
    input: {
      padding: theme.spacing(1),
      width: "100%",
    }
  })
);
