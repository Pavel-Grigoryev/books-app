import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createTheme, ThemeProvider } from '@mui/material';
import { App } from 'app';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { HashRouter } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3d4a3d',
    },
    secondary: {
      main: '#8C9296',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </ThemeProvider>
);
