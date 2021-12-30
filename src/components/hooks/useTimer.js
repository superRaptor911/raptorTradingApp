import {useEffect} from 'react';

const useTimer = (updateDelay = 2000, callbackFn) => {
  useEffect(() => {
    const timer = setInterval(() => {
      callbackFn();
    }, updateDelay);

    return () => clearTimeout(timer);
  }, [updateDelay]);
};

export default useTimer;
