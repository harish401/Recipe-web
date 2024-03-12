import { createTheme } from '@mui/material/styles';

// Define your custom theme
const theme = createTheme({
  palette: {
    mode: 'light', // Default mode is light
    primary: {
      main: '#F2800D',
    },
    secondary: {
      main: '#b5ecfb',
    },
    background: {
      default: '#f5f5f5', // Light mode background color
    },
  },
  
  typography: {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 500,
    fontStyle: "normal",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
