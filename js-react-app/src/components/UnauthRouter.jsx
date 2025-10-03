import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import LoginPage from './LoginPage';

export const UnauthRouter = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    loader: () => {
      window.location.replace('/');
      return null;
    },
  },
]);
