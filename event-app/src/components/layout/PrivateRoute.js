import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import Layout from './Layout';

// Component takes in a single prop, 'children', which is the content to be rendered inside the component.
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // checks if the user is logged in by looking for the current user.
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, it will render the children content, wrapped in another component called 'Layout'.
  return <Layout>{children}</Layout>;
};

export default PrivateRoute;
