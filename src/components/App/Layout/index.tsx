import React from 'react';
import Navbar from '../../Navbar/Navbar';

const Layout = (props) => {
  const { children } = props;

  return (
    <>
      <Navbar />
      {children}
    </>

  );
};

export default Layout;
