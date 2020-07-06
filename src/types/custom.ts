import { CognitoUser } from '@aws-amplify/auth';

interface CognitoUserExt extends CognitoUser {
  attributes: UserAttributes;
}

interface UserAttributes {
  sub: string;
  email: string;
  email_verified: string;
  name: string;
  updated_at: string;
}

export interface AuthProps {
  user: CognitoUserExt
  signOut: Function
}
