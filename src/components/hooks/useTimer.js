import {useEffect} from 'react';

const useTimer = (updateDelay = 2000, callbackFn) => {
  useEffect(() => {
    const timer = setTimeout(callbackFn);
    return () => clearTimeout(timer);
  }, [updateDelay]);
};

export default useTimer;
