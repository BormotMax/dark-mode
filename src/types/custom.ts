import { CognitoUser } from '@aws-amplify/auth';
import {
  GetCommentQuery,
  GetProjectQuery,
  GetQuoteQuery,
  GetTaskQuery,
  GetUserQuery,
  GetHireMeInfoQuery,
  GetDomainSlugQuery,
  HireInfoByDomainSlugQuery,
} from '../API';

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
  currentUser: CognitoUserExt;
  signOut: Function;
  signIn: Function;
}

export type Project = GetProjectQuery['getProject'];
export type Comment = GetCommentQuery['getComment'];
export type Quote = GetQuoteQuery['getQuote'];
export type Task = GetTaskQuery['getTask'];
export type User = GetUserQuery['getUser'];
export type HireMeInfo = GetHireMeInfoQuery['getHireMeInfo'];
export type HireMeInfoByDomainSlug = HireInfoByDomainSlugQuery['hireInfoByDomainSlug'];
export type DomainSlug = GetDomainSlugQuery['getDomainSlug'];
