import React, { useContext } from 'react';
import Rollbar from 'rollbar';

export const LoggerContext = React.createContext({ logger: null });

export const useLogger = (): any => useContext(LoggerContext);

export const LoggerProvider: React.FC = ({ children }: { children: any }) => {
  const logger = new Rollbar({
    accessToken: process.env.NEXT_PUBLIC_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: { environment: process.env.NODE_ENV },
  });

  return <LoggerContext.Provider value={{ logger }}>{children}</LoggerContext.Provider>;
};
