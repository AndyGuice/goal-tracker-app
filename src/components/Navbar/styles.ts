import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme: Theme) =>
    createStyles({
        container: {
            flexGrow: 1,
            width: '100%',
        },
        title: {
            flexGrow: 1,
        },
        logout: {
            marginLeft: '20px',
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
            marginRight: '20px'
        },
        button: {
            
        },
        navLinks: {
            display: 'flex',
        },
        [theme.breakpoints.down("sm")]: {
        },
        [theme.breakpoints.down("xs")]: {
        },
    }),
);
