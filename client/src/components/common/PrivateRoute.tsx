import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import cookieService from '../../services/cookieService';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const token = cookieService.getUserToken();

  if (!token) {
    const renderComponent = () => <Redirect to="/login" />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default PrivateRoute;
