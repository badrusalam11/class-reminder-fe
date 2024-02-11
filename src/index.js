// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import NotFound from 'layouts/general'
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import PrivateRoute from './PrivateRoute'; // Import updated PrivateRoute component

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <HashRouter>
          <Switch>
            <Route path="/auth" component={AuthLayout} />
            {/* Use PrivateRoute for protected routes */}
            <PrivateRoute
              path="/admin"
              component={AdminLayout}
              redirectPath="/auth/login"
            />
            <PrivateRoute
              path="/rtl"
              component={RtlLayout}
              redirectPath="/auth/login"
            />
            <PrivateRoute
              path="/notfound"
              component={NotFound}
              redirectPath="/notfound"
            />
            {/* Redirect to login page if no matching route */}
            {/* <Redirect from="/" to="/auth/login" /> */}
            <Redirect from='/' to='/admin' />

          </Switch>
        </HashRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
