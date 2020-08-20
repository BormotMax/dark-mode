import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useFlash = (time = 4000) => {
  const [flash, setFlashState] = useState(null);

  const setFlash = (msg: string) => {
    setFlashState(msg);
    setTimeout(() => {
      setFlashState(null);
    }, time);
  };

  return [flash, setFlash];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDelayedFlash = (time = 4000) => {
  const [flash, setFlashState] = useState(null);

  const setFlash = (msg: string) => {
    setFlashState(msg);
    setTimeout(() => {
      setFlashState(null);
    }, time);
  };

  const setFlashInStorage = (msg: string) => {
    localStorage.setItem('flash', msg);
  };

  useEffect(() => {
    const msg = localStorage.getItem('flash');
    if (msg) {
      setFlash(msg);
      localStorage.removeItem('flash');
    }
  }, []);

  return [flash, setFlashInStorage];
};
