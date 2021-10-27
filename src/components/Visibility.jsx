/* eslint-disable react/prop-types */
import React from 'react';

const Visibility = ({children, hide = false}) => {
  if (hide) {
    return null;
  }

  return <>{children}</>;
};

export default Visibility;
