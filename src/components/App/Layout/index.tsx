import React from 'react';
import Navbar from '../../Navbar/Navbar';

const Layout = (props: any) => {
  const { children } = props;

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: 80 }}>
        {children}
      </div>
    </div>

  );
};

export default Layout;
