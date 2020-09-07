import React, { useContext, useState, useEffect } from 'react';
import { Auth } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import { useLogger } from './useLogger';

export const UserContext = React.createContext({
  pending: true,
  currentUser: null,
  signIn: null,
  signOut: null,
});

export const useCurrentUser = (): any => useContext(UserContext);

export const UserDataProvider: React.FC = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const router = useRouter();
  const { logger } = useLogger();

  const signOut = async () => {
    try {
      await Auth.signOut();
      router.push('/signIn');
    } catch (error) {
      logger.error('UserDataProvider: error signing out', { error });
      // todo: setFlash("There was an error while trying to sign out.")
    }
  };

  const signIn = async (email, password) => {
    // let the caller of this function catch any errors. This way we don't have to worry about what to return.
    const cognitoUser = await Auth.signIn(email, password);
    const data: { verified: { email?: string }; unverified: any } = await Auth.verifiedContact(cognitoUser);

    if (!data.verified.email) {
      // User has an account, but has not verified through email yet
      return false;
    }

    setCurrentUser(cognitoUser);
    return true;
  };

  useEffect(() => {
    const execute = async () => {
      try {
        setPending(true);
        const cognitoUser = await Auth.currentAuthenticatedUser();
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
