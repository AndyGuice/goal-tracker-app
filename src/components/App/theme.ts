import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    "fontFamily": `"roboto", sans-serif`,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 700
  },
  palette: {
    primary: {
      main: "#8316e2",
    },
    secondary: {
      main: "#75e216",
    },
    warning: {
      main: "#e21675"
    }
  },
});

export default theme;
