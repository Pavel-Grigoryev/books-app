import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'app/App';
import { Provider } from 'react-redux';
import { store } from 'app/store';

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
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);
