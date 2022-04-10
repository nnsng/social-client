import { CssBaseline } from '@mui/material';
import { ApplyTheme } from 'components/common';
import 'i18n';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import './styles/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApplyTheme>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ApplyTheme>
    </Provider>
  </React.StrictMode>
);
