import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = ({marginTop = 0}) => {
  return (
    <div
      style={{display: 'flex', justifyContent: 'center', marginTop: marginTop}}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
