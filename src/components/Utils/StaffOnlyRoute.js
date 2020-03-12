import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/token-service';

export default function StaffOnlyRoute({component, ...props}) {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.isStaff()
          ? <Component {...componentProps} />
          : <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location }
              }}
            />
        )}
    />
  )
}