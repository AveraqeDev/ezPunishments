import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

export default function StaffOnlyRoute({component, ...props}) {
  const context = useContext(UserContext);
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps => (
        context.isStaff()
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