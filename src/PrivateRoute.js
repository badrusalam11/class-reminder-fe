// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Function to check if the user is logged in (replace this with your actual logic)
const isUserLoggedIn = () => {
  // Implement your session check logic here
  // For example, you can check if a token exists in localStorage or a global state
  // Return true if the user is logged in, otherwise false
  // Replace the following line with your actual implementation
  let status = localStorage.getItem('token') !== null
  console.log("status login:", status)
  return status;
};

const PrivateRoute = ({ path, component: Component, redirectPath, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      path!=="/auth/sign-in"?(
        isUserLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectPath} />
        )

      ):(
        // kalo dah login
        isUserLoggedIn() ? (
          <Redirect to={"/admin/default"} />
        ) : (
          <Redirect to={redirectPath} />
        )
      )
    }
  />
);

export default PrivateRoute;
