import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography, Container, Grid, Paper, Box } from '@mui/material';


import AppRouter from './router/Routes';
import theme from './theme';





const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box >
        <AppRouter />
      </Box>
    </ThemeProvider>
  );
};

export default App;