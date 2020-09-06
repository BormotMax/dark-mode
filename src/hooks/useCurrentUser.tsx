import React, { useContext, useState, useEffect } from 'react';
import { Auth } from '@aws-amplify/auth';
import { useRouter } from 'next/router';

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

  const signOut = async () => {
    try {
      await Auth.signOut();
      router.push('/signIn');
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = async (email, password) => {
    const cognitoUser = await Auth.signIn(email, password);
    const data: { verified: { email?: string }; unverified: any } = await Auth.verifiedContact(cognitoUser);

    if (!data.verified.email) {
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
      } catch (err) {
        setCurrentUser(null);
        setPending(false);
      }
    };

    execute();
  }, [router.pathname]);

  return <UserContext.Provider value={{ currentUser, pending, signIn, signOut }}>{children}</UserContext.Provider>;
};
