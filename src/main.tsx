import { CssBaseline } from '@mui/material';
import 'i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import { CustomThemeProvider } from './components/common';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </CustomThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
