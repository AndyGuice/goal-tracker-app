import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import Layout from "./Layout";
import Router from "../Router/Router";

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

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Layout>
          <Router />
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
