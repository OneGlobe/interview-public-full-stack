import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const WithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default WithHeader;
