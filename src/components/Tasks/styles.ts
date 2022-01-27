import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    button: {},
    paper: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
      border: '1px solid black',
      backgroundColor: '#eeeeee'
    },
    input: {
      padding: theme.spacing(1)
    }
  })
);
