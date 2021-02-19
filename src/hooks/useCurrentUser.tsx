import React, { useContext, useState, useEffect } from 'react';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { useRouter } from 'next/router';

import { useLogger } from './useLogger';
import { useFlash } from './useFlash';

type CustomCognitoUser = CognitoUser & {
  [key: string]: any; // Fix for invalid types in CognitoUser
};

type User = {
  pending: boolean,
  currentUser: CustomCognitoUser | null,
  signIn: (email: string, password: string) => Promise<boolean> |null,
  signOut: (redirect?: string) => Promise<void> | null,
};

type VerifiedContact = {
  verified: {
    email?: string,
    phone_number?: string,
  },
  unverified: {
    email?: string,
    phone_number?: string,
  },
};

export const UserContext = React.createContext<User>({
  pending: true,
  currentUser: null,
  signIn: null,
  signOut: null,
});

export const useCurrentUser = (): User => useContext(UserContext);

export const UserDataProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CustomCognitoUser | null>(null);
  const [pending, setPending] = useState(true);
  const router = useRouter();
  const { logger } = useLogger();
  const { setFlash } = useFlash();

  const signOut = async (redirect?: string): Promise<void> => {
    try {
      await Auth.signOut();

      if (redirect) {
        await router.push(redirect);
      }
    } catch (error) {
      logger.error('UserDataProvider: error signing out', { error });
      setFlash('There was an error while trying to sign out.');
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // let the caller of this function catch any errors. This way we don't have to worry about what to return
    // if Auth.signIn throws an error.
    const cognitoUser: CustomCognitoUser = await Auth.signIn(email, password);
    const data: VerifiedContact = await Auth.verifiedContact(cognitoUser);

    if (!data.verified.email) {
      // User has an account, but has not verified through email yet
      return false;
    }

    setCurrentUser(cognitoUser);
    return true;
  };

  useEffect(() => {
    const execute = async (): Promise<void> => {
      try {
        setPending(true);
        const cognitoUser: CustomCognitoUser = await Auth.currentAuthenticatedUser();
        setCurrentUser(cognitoUser);
        setPending(false);
      } catch (error) {
        setCurrentUser(null);
        setPending(false);
      }
    };

    execute();
  }, [router.pathname]);

  return <UserContext.Provider value={{ currentUser, pending, signIn, signOut }}>{children}</UserContext.Provider>;
};
