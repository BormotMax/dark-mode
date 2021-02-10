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
  GetProjectClientQuery,
  GetProjectAssetsQuery,
  GetNoteQuery,
  GetProjectFreelancerQuery,
} from '../API';

interface CognitoUserExt extends CognitoUser {
  username: string;
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
export type ProjectClient = GetProjectClientQuery['getProjectClient'];
export type ProjectFreelancer = GetProjectFreelancerQuery['getProjectFreelancer'];
export type HireMeInfo = GetHireMeInfoQuery['getHireMeInfo'];
export type HireMeInfoByDomainSlug = HireInfoByDomainSlugQuery['hireInfoByDomainSlug'];
export type DomainSlug = GetDomainSlugQuery['getDomainSlug'];
export type ProjectAsset = GetProjectAssetsQuery['getProjectAssets'];
export type Note = GetNoteQuery['getNote'];

export enum ReservedRouteNames {
  _APP = '_app',
  ALL_USERS = 'all-users',
  FORGOT_PASSWORD = 'forgot-password',
  HIRE_PAGE_EDITOR = 'hire-page-editor',
  INDEX = 'index',
  PRIVACY_POLICY = 'privacy-policy',
  PROJECT = 'project',
  PROJECTS = 'projects',
  SIGN_UP = 'sign-up',
  SIGN_IN = 'signIn',
  CORRECTED_SIGN_IN = 'sign-in',
  TERMS_AND_CONDITIONS = 'terms-and-conditions',
  DASHBOARD = 'dashboard',
  CONVERSATION = 'conversation',
  FINANCIAL = 'financial',
  MY_CREWS = 'my-crews',
  SETTINGS = 'settings',
  COMMUNITY = 'community',
  ADMIN = 'admin',
  CLIENT = 'client',
  FREELANCER = 'freelancer',
}
