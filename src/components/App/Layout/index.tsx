import React from 'react';
import Navbar from '../../Navbar/Navbar';

const Layout = (props: any) => {
  const { children } = props;

  return (
    <div>
      <Navbar />
      {children}
    </div>

  );
};

export default Layout;
