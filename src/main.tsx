import { CssBaseline } from '@mui/material';
import { ApplyTheme } from 'components/common';
import 'i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApplyTheme>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ApplyTheme>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
