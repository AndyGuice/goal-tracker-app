import { createTheme } from '@mui/material/styles'
import { grey, red, amber } from '@mui/material/colors'

const theme = createTheme({
  typography: {
    useNextVariants: true,
    p: {
      fontFamily: 'Futura Normal, Arial, sans-serif',
    },
    body1: {
      fontFamily: 'Futura Normal, Arial, sans-serif',
    },
    body2: {
      fontFamily: 'Futura Normal, Arial, sans-serif',
    },
    subtitle1: {
      fontFamily: 'Futura Normal, Arial, sans-serif',
    },
    h1: {
      fontFamily: 'Nicotine',
    },
    h2: {
      fontFamily: 'Nicotine',
    },
    h3: {
      fontFamily: 'Nicotine',
    },
    h4: {
      fontFamily: 'Nicotine',
    },
    h5: {
      fontFamily: 'Nicotine',
    },
  },
  palette: {
    primary: amber,
    secondary: amber,
    type: 'light',
    common: {
      black: '#282c34',
      white: '#fff',
    },
    error: red,
    grey,
  },
})

export default theme
