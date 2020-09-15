import React, { useState, useEffect, useContext } from 'react';

const FLASH_MESSAGE_TIME = 7000;
const LOCAL_STORAGE_KEY = 'continuum_flash';

export const FlashContext = React.createContext({
  setFlash: null,
  setDelayedFlash: null,
});

export const useFlash = (): any => useContext(FlashContext);

export const FlashProvider: React.FC = ({ children }) => {
  const [flash, setFlashState] = useState(null);

  useEffect(() => {
    const msg = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (msg) {
      setFlashState(msg);
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      setTimeout(() => {
        setFlashState(null);
      }, FLASH_MESSAGE_TIME);
    }
  });

  const setFlash = (msg: string) => {
    setFlashState(msg);
    setTimeout(() => {
      setFlashState(null);
    }, FLASH_MESSAGE_TIME);
  };

  const setDelayedFlash = (msg: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, msg);
  };

  return (
    <FlashContext.Provider value={{ setFlash, setDelayedFlash }}>
      <div className="flash-message">{flash}</div>
      {children}
    </FlashContext.Provider>
  );
};
