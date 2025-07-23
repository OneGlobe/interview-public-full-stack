import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useAuth } from '../hooks';
import { checkValidToken } from '../utils/utils';
import { AuthRouter } from './AuthRouter';
import { UnauthRouter } from './UnauthRouter';
import '../App.css';

const AppRouter = () => {
  const auth = useAuth();
  const isLoading = auth.isLoading;

  const validToken = checkValidToken(auth);

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen w-full flex items-center justify-center bg-custom-bg">
          <div className="text-center">
            <p className="text-lg">Loading...</p>
            <div className="text-gray-600">Checking authentication...</div>
          </div>
        </div>
      </>
    );
  }

  return <RouterProvider router={validToken ? AuthRouter : UnauthRouter} />;
};

export default AppRouter;
