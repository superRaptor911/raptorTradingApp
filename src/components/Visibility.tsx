/* eslint-disable react/prop-types */
import React from 'react';

const Visibility = ({
  children,
  hide = false,
}: {
  children: any;
  hide: boolean;
}) => {
  if (hide) {
    return null;
  }

  return <>{children}</>;
};

export default Visibility;
