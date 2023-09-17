import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'components/Common/customReduxRouter';

import { history } from 'utils';
import { configureStore } from 'store';

const container = document.getElementById('root')!;
const root = createRoot(container);
const store =configureStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
