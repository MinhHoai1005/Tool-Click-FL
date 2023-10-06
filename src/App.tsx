import { CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'components/Common/customReduxRouter';
import { store } from 'store';
import { history } from 'utils';
import Routes from "./routes"

function App() {
  useEffect(() => {
    // accountApi.create().then((response) => console.log(response))
  })
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <CssBaseline />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

