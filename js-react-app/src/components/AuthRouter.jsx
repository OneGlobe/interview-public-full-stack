import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import WithHeader from './WithHeader';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';

export const AuthRouter = createBrowserRouter([
  {
    element: <WithHeader />,
    errorElement: <ErrorPage />,
    handle: {
      crumb: () => 'Home',
    },
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '*',
        loader: () => {
          window.location.replace('/');
          return null;
        },
      },
    ],
  },
]);
