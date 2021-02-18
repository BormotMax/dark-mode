import React, { useContext } from 'react';
import Rollbar from 'rollbar';

type Logger = {
  logger: Rollbar | null
};

export const LoggerContext = React.createContext<Logger>({ logger: null });

export const useLogger = (): Logger => useContext(LoggerContext);

export const LoggerProvider: React.FC = ({ children }) => {
  const logger = new Rollbar({
    accessToken: process.env.NEXT_PUBLIC_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: process.env.NODE_ENV,
      client: {
        javascript: {
          source_map_enabled: true, // true by default

          code_version: '0.1.0',

          // Optionally have Rollbar guess which frames the error was
          // thrown from when the browser does not provide line
          // and column numbers.
          guess_uncaught_frames: true,
        },
      },
    },
  });

  return <LoggerContext.Provider value={{ logger }}>{children}</LoggerContext.Provider>;
};
