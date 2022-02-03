import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Layout from "./Layout";
import Router from "../Router/Router";
import createCache from '@emotion/cache';
import {
  CacheProvider,
  EmotionCache
} from '@emotion/react';
import {
  ThemeProvider,
  CssBaseline,
  createTheme
} from '@mui/material';

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

export const muiCache = createCache({
  'key': 'mui',
  'prepend': true,
});

const App = () => {
  return (
    <BrowserRouter>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Layout>
              <Router />
            </Layout>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </BrowserRouter>
  );
};

export default App;
