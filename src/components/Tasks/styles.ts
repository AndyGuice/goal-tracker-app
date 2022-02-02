import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    button: {},
    paper: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(1),
      border: '1px solid black',
      width: "60%",
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      }
    },
    input: {
      padding: theme.spacing(1),
      width: "100%"
    }
  })
);
