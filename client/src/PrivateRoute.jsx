import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ children, ...rest }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div>
      <Route
        {...rest}
        render={({ location }) => (isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        ))}
      />
    </div>
  );
};

export default PrivateRoute;
