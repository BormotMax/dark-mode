import React, { useContext, useState, useEffect } from 'react';
import { Auth } from '@aws-amplify/auth';

const userDataMock = {
  appSyncUser: {
    name: 'Matt',
    theme: 'dark',
    role: 'FREELANCER',
  },
  cognitoUser: { id: 'ksafjk' },
};

export const UserContext = React.createContext({
  pending: true, currentUser: { appSyncUser: null, cognitoUser: null }, signIn: null, signOut: null,
});

export const useCurrentUser = ():any => useContext(UserContext);

export const UserDataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ appSyncUser: null, cognitoUser: null });
  const [pending, setPending] = useState(true);

  const signOut = async () => {
    try {
      await Auth.signOut();
      setCurrentUser({ appSyncUser: null, cognitoUser: null });
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = async (email, password) => {
    const cognitoUser = await Auth.signIn(email, password);
    const data: { verified: { email?: string }, unverified: {} } = await Auth.verifiedContact(cognitoUser);

    if (!data.verified.email) {
      return false;
    }

    // const appSyncUser = await fetch appsync user (cognitoUser.id)
    const { appSyncUser } = userDataMock;
    setCurrentUser({ appSyncUser, cognitoUser });
    return true;
  };

  useEffect(() => {
    const execute = async () => {
      try {
        setPending(true);
        const cognitoUser = await Auth.currentAuthenticatedUser();
        // const appSyncUser = await fetch appsync user (cognitoUser.id)
        const { appSyncUser } = userDataMock;
        setCurrentUser({ appSyncUser, cognitoUser });
        setPending(false);
      } catch (err) {
        setCurrentUser({ appSyncUser: null, cognitoUser: null });
        setPending(false);
      }
    };

    execute();
  }, []);

  return (
    <UserContext.Provider value={{
      currentUser, pending, signIn, signOut,
    }}
    >
      {children}
    </UserContext.Provider>
  );
};
