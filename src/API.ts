/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
  company?: string | null,
  email?: string | null,
  phone?: string | null,
  signedOutAuthToken?: string | null,
  role: UserRole,
};

export enum UserRole {
  FREELANCER = "FREELANCER",
  CLIENT = "CLIENT",
}


export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  company?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  signedOutAuthToken?: ModelStringInput | null,
  role?: ModelUserRoleInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelUserRoleInput = {
  eq?: UserRole | null,
  ne?: UserRole | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  company?: string | null,
  email?: string | null,
  phone?: string | null,
  signedOutAuthToken?: string | null,
  role?: UserRole | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateProjectClientInput = {
  id?: string | null,
  clientID: string,
  projectID: string,
  title?: string | null,
};

export type ModelProjectClientConditionInput = {
  clientID?: ModelIDInput | null,
  projectID?: ModelIDInput | null,
  title?: ModelStringInput | null,
  and?: Array< ModelProjectClientConditionInput | null > | null,
  or?: Array< ModelProjectClientConditionInput | null > | null,
  not?: ModelProjectClientConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateProjectClientInput = {
  id: string,
  clientID?: string | null,
  projectID?: string | null,
  title?: string | null,
};

export type DeleteProjectClientInput = {
  id?: string | null,
};

export type CreateProjectFreelancerInput = {
  id?: string | null,
  freelancerID: string,
  projectID: string,
  title?: string | null,
};

export type ModelProjectFreelancerConditionInput = {
  freelancerID?: ModelIDInput | null,
  projectID?: ModelIDInput | null,
  title?: ModelStringInput | null,
  and?: Array< ModelProjectFreelancerConditionInput | null > | null,
  or?: Array< ModelProjectFreelancerConditionInput | null > | null,
  not?: ModelProjectFreelancerConditionInput | null,
};

export type UpdateProjectFreelancerInput = {
  id: string,
  freelancerID?: string | null,
  projectID?: string | null,
  title?: string | null,
};

export type DeleteProjectFreelancerInput = {
  id?: string | null,
};

export type CreateProjectInput = {
  id?: string | null,
  createdAt?: string | null,
  owner: string,
  freelancerID: string,
  clientID: string,
  details?: string | null,
};

export type ModelProjectConditionInput = {
  createdAt?: ModelStringInput | null,
  freelancerID?: ModelIDInput | null,
  clientID?: ModelIDInput | null,
  details?: ModelStringInput | null,
  and?: Array< ModelProjectConditionInput | null > | null,
  or?: Array< ModelProjectConditionInput | null > | null,
  not?: ModelProjectConditionInput | null,
};

export type UpdateProjectInput = {
  id: string,
  createdAt?: string | null,
  owner?: string | null,
  freelancerID?: string | null,
  clientID?: string | null,
  details?: string | null,
};

export type DeleteProjectInput = {
  id?: string | null,
};

export type CreateQuoteInput = {
  id?: string | null,
  projectID: string,
};

export type ModelQuoteConditionInput = {
  projectID?: ModelIDInput | null,
  and?: Array< ModelQuoteConditionInput | null > | null,
  or?: Array< ModelQuoteConditionInput | null > | null,
  not?: ModelQuoteConditionInput | null,
};

export type UpdateQuoteInput = {
  id: string,
  projectID?: string | null,
};

export type DeleteQuoteInput = {
  id?: string | null,
};

export type CreateCommentInput = {
  id?: string | null,
  createdAt?: string | null,
  projectID: string,
  content: string,
  creatorID: string,
};

export type ModelCommentConditionInput = {
  createdAt?: ModelStringInput | null,
  projectID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  creatorID?: ModelIDInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
};

export type UpdateCommentInput = {
  id: string,
  createdAt?: string | null,
  projectID?: string | null,
  content?: string | null,
  creatorID?: string | null,
};

export type DeleteCommentInput = {
  id?: string | null,
};

export type CreateTaskInput = {
  id?: string | null,
  quoteID: string,
  text: string,
  completed: boolean,
};

export type ModelTaskConditionInput = {
  quoteID?: ModelIDInput | null,
  text?: ModelStringInput | null,
  completed?: ModelBooleanInput | null,
  and?: Array< ModelTaskConditionInput | null > | null,
  or?: Array< ModelTaskConditionInput | null > | null,
  not?: ModelTaskConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateTaskInput = {
  id: string,
  quoteID?: string | null,
  text?: string | null,
  completed?: boolean | null,
};

export type DeleteTaskInput = {
  id?: string | null,
};

export type CreateHireMeInfoInput = {
  freelancerID: string,
  name?: string | null,
  title?: string | null,
  email: string,
  buttonText?: string | null,
  blurbText?: string | null,
  aboutText?: string | null,
  twitterUrl?: string | null,
  dribbbleUrl?: string | null,
  instagramUrl?: string | null,
  linkedInUrl?: string | null,
  domainSlugID: string,
  bannerImage?: S3ObjectInput | null,
  portfolioImages?: Array< S3ObjectInput | null > | null,
};

export type S3ObjectInput = {
  key: string,
  tag?: string | null,
};

export type ModelHireMeInfoConditionInput = {
  name?: ModelStringInput | null,
  title?: ModelStringInput | null,
  email?: ModelStringInput | null,
  buttonText?: ModelStringInput | null,
  blurbText?: ModelStringInput | null,
  aboutText?: ModelStringInput | null,
  twitterUrl?: ModelStringInput | null,
  dribbbleUrl?: ModelStringInput | null,
  instagramUrl?: ModelStringInput | null,
  linkedInUrl?: ModelStringInput | null,
  domainSlugID?: ModelIDInput | null,
  and?: Array< ModelHireMeInfoConditionInput | null > | null,
  or?: Array< ModelHireMeInfoConditionInput | null > | null,
  not?: ModelHireMeInfoConditionInput | null,
};

export type UpdateHireMeInfoInput = {
  freelancerID: string,
  name?: string | null,
  title?: string | null,
  email?: string | null,
  buttonText?: string | null,
  blurbText?: string | null,
  aboutText?: string | null,
  twitterUrl?: string | null,
  dribbbleUrl?: string | null,
  instagramUrl?: string | null,
  linkedInUrl?: string | null,
  domainSlugID?: string | null,
  bannerImage?: S3ObjectInput | null,
  portfolioImages?: Array< S3ObjectInput | null > | null,
};

export type DeleteHireMeInfoInput = {
  freelancerID: string,
};

export type CreateDomainSlugInput = {
  slug: string,
  freelancerID: string,
};

export type ModelDomainSlugConditionInput = {
  freelancerID?: ModelIDInput | null,
  and?: Array< ModelDomainSlugConditionInput | null > | null,
  or?: Array< ModelDomainSlugConditionInput | null > | null,
  not?: ModelDomainSlugConditionInput | null,
};

export type UpdateDomainSlugInput = {
  slug: string,
  freelancerID?: string | null,
};

export type DeleteDomainSlugInput = {
  slug: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  company?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  signedOutAuthToken?: ModelStringInput | null,
  role?: ModelUserRoleInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelProjectClientFilterInput = {
  id?: ModelIDInput | null,
  clientID?: ModelIDInput | null,
  projectID?: ModelIDInput | null,
  title?: ModelStringInput | null,
  and?: Array< ModelProjectClientFilterInput | null > | null,
  or?: Array< ModelProjectClientFilterInput | null > | null,
  not?: ModelProjectClientFilterInput | null,
};

export type ModelProjectFreelancerFilterInput = {
  id?: ModelIDInput | null,
  freelancerID?: ModelIDInput | null,
  projectID?: ModelIDInput | null,
  title?: ModelStringInput | null,
  and?: Array< ModelProjectFreelancerFilterInput | null > | null,
  or?: Array< ModelProjectFreelancerFilterInput | null > | null,
  not?: ModelProjectFreelancerFilterInput | null,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  freelancerID?: ModelIDInput | null,
  clientID?: ModelIDInput | null,
  details?: ModelStringInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelQuoteFilterInput = {
  id?: ModelIDInput | null,
  projectID?: ModelIDInput | null,
  and?: Array< ModelQuoteFilterInput | null > | null,
  or?: Array< ModelQuoteFilterInput | null > | null,
  not?: ModelQuoteFilterInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  projectID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  creatorID?: ModelIDInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type ModelTaskFilterInput = {
  id?: ModelIDInput | null,
  quoteID?: ModelIDInput | null,
  text?: ModelStringInput | null,
  completed?: ModelBooleanInput | null,
  and?: Array< ModelTaskFilterInput | null > | null,
  or?: Array< ModelTaskFilterInput | null > | null,
  not?: ModelTaskFilterInput | null,
};

export type ModelHireMeInfoFilterInput = {
  freelancerID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  title?: ModelStringInput | null,
  email?: ModelStringInput | null,
  buttonText?: ModelStringInput | null,
  blurbText?: ModelStringInput | null,
  aboutText?: ModelStringInput | null,
  twitterUrl?: ModelStringInput | null,
  dribbbleUrl?: ModelStringInput | null,
  instagramUrl?: ModelStringInput | null,
  linkedInUrl?: ModelStringInput | null,
  domainSlugID?: ModelIDInput | null,
  and?: Array< ModelHireMeInfoFilterInput | null > | null,
  or?: Array< ModelHireMeInfoFilterInput | null > | null,
  not?: ModelHireMeInfoFilterInput | null,
};

export type ModelDomainSlugFilterInput = {
  slug?: ModelIDInput | null,
  freelancerID?: ModelIDInput | null,
  and?: Array< ModelDomainSlugFilterInput | null > | null,
  or?: Array< ModelDomainSlugFilterInput | null > | null,
  not?: ModelDomainSlugFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    company: string | null,
    email: string | null,
    phone: string | null,
    signedOutAuthToken: string | null,
    role: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    company: string | null,
    email: string | null,
    phone: string | null,
    signedOutAuthToken: string | null,
    role: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    company: string | null,
    email: string | null,
    phone: string | null,
    signedOutAuthToken: string | null,
    role: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProjectClientMutationVariables = {
  input: CreateProjectClientInput,
  condition?: ModelProjectClientConditionInput | null,
};

export type CreateProjectClientMutation = {
  createProjectClient:  {
    __typename: "ProjectClient",
    id: string,
    clientID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateProjectClientMutationVariables = {
  input: UpdateProjectClientInput,
  condition?: ModelProjectClientConditionInput | null,
};

export type UpdateProjectClientMutation = {
  updateProjectClient:  {
    __typename: "ProjectClient",
    id: string,
    clientID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteProjectClientMutationVariables = {
  input: DeleteProjectClientInput,
  condition?: ModelProjectClientConditionInput | null,
};

export type DeleteProjectClientMutation = {
  deleteProjectClient:  {
    __typename: "ProjectClient",
    id: string,
    clientID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateProjectFreelancerMutationVariables = {
  input: CreateProjectFreelancerInput,
  condition?: ModelProjectFreelancerConditionInput | null,
};

export type CreateProjectFreelancerMutation = {
  createProjectFreelancer:  {
    __typename: "ProjectFreelancer",
    id: string,
    freelancerID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateProjectFreelancerMutationVariables = {
  input: UpdateProjectFreelancerInput,
  condition?: ModelProjectFreelancerConditionInput | null,
};

export type UpdateProjectFreelancerMutation = {
  updateProjectFreelancer:  {
    __typename: "ProjectFreelancer",
    id: string,
    freelancerID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteProjectFreelancerMutationVariables = {
  input: DeleteProjectFreelancerInput,
  condition?: ModelProjectFreelancerConditionInput | null,
};

export type DeleteProjectFreelancerMutation = {
  deleteProjectFreelancer:  {
    __typename: "ProjectFreelancer",
    id: string,
    freelancerID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type CreateProjectMutation = {
  createProject:  {
    __typename: "Project",
    id: string,
    createdAt: string,
    owner: string,
    freelancerID: string,
    clientID: string,
    details: string | null,
    updatedAt: string,
    freelancer:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    client:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    clients:  {
      __typename: "ModelProjectClientConnection",
      items:  Array< {
        __typename: "ProjectClient",
        id: string,
        clientID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    freelancers:  {
      __typename: "ModelProjectFreelancerConnection",
      items:  Array< {
        __typename: "ProjectFreelancer",
        id: string,
        freelancerID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            completed: boolean,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        createdAt: string,
        projectID: string,
        content: string,
        creatorID: string,
        updatedAt: string,
        creator:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type UpdateProjectMutation = {
  updateProject:  {
    __typename: "Project",
    id: string,
    createdAt: string,
    owner: string,
    freelancerID: string,
    clientID: string,
    details: string | null,
    updatedAt: string,
    freelancer:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    client:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    clients:  {
      __typename: "ModelProjectClientConnection",
      items:  Array< {
        __typename: "ProjectClient",
        id: string,
        clientID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    freelancers:  {
      __typename: "ModelProjectFreelancerConnection",
      items:  Array< {
        __typename: "ProjectFreelancer",
        id: string,
        freelancerID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            completed: boolean,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        createdAt: string,
        projectID: string,
        content: string,
        creatorID: string,
        updatedAt: string,
        creator:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type DeleteProjectMutation = {
  deleteProject:  {
    __typename: "Project",
    id: string,
    createdAt: string,
    owner: string,
    freelancerID: string,
    clientID: string,
    details: string | null,
    updatedAt: string,
    freelancer:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    client:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    clients:  {
      __typename: "ModelProjectClientConnection",
      items:  Array< {
        __typename: "ProjectClient",
        id: string,
        clientID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    freelancers:  {
      __typename: "ModelProjectFreelancerConnection",
      items:  Array< {
        __typename: "ProjectFreelancer",
        id: string,
        freelancerID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            completed: boolean,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        createdAt: string,
        projectID: string,
        content: string,
        creatorID: string,
        updatedAt: string,
        creator:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateQuoteMutationVariables = {
  input: CreateQuoteInput,
  condition?: ModelQuoteConditionInput | null,
};

export type CreateQuoteMutation = {
  createQuote:  {
    __typename: "Quote",
    id: string,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        completed: boolean,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateQuoteMutationVariables = {
  input: UpdateQuoteInput,
  condition?: ModelQuoteConditionInput | null,
};

export type UpdateQuoteMutation = {
  updateQuote:  {
    __typename: "Quote",
    id: string,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        completed: boolean,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteQuoteMutationVariables = {
  input: DeleteQuoteInput,
  condition?: ModelQuoteConditionInput | null,
};

export type DeleteQuoteMutation = {
  deleteQuote:  {
    __typename: "Quote",
    id: string,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        completed: boolean,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment:  {
    __typename: "Comment",
    id: string,
    createdAt: string,
    projectID: string,
    content: string,
    creatorID: string,
    updatedAt: string,
    creator:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment:  {
    __typename: "Comment",
    id: string,
    createdAt: string,
    projectID: string,
    content: string,
    creatorID: string,
    updatedAt: string,
    creator:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment:  {
    __typename: "Comment",
    id: string,
    createdAt: string,
    projectID: string,
    content: string,
    creatorID: string,
    updatedAt: string,
    creator:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateTaskMutationVariables = {
  input: CreateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type CreateTaskMutation = {
  createTask:  {
    __typename: "Task",
    id: string,
    quoteID: string,
    text: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTaskMutationVariables = {
  input: UpdateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type UpdateTaskMutation = {
  updateTask:  {
    __typename: "Task",
    id: string,
    quoteID: string,
    text: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTaskMutationVariables = {
  input: DeleteTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type DeleteTaskMutation = {
  deleteTask:  {
    __typename: "Task",
    id: string,
    quoteID: string,
    text: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateHireMeInfoMutationVariables = {
  input: CreateHireMeInfoInput,
  condition?: ModelHireMeInfoConditionInput | null,
};

export type CreateHireMeInfoMutation = {
  createHireMeInfo:  {
    __typename: "HireMeInfo",
    freelancerID: string,
    name: string | null,
    title: string | null,
    email: string,
    buttonText: string | null,
    blurbText: string | null,
    aboutText: string | null,
    twitterUrl: string | null,
    dribbbleUrl: string | null,
    instagramUrl: string | null,
    linkedInUrl: string | null,
    domainSlugID: string,
    bannerImage:  {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null,
    portfolioImages:  Array< {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    domainSlug:  {
      __typename: "DomainSlug",
      slug: string,
      freelancerID: string,
      createdAt: string,
      updatedAt: string,
      hireMeInfo:  {
        __typename: "HireMeInfo",
        freelancerID: string,
        name: string | null,
        title: string | null,
        email: string,
        buttonText: string | null,
        blurbText: string | null,
        aboutText: string | null,
        twitterUrl: string | null,
        dribbbleUrl: string | null,
        instagramUrl: string | null,
        linkedInUrl: string | null,
        domainSlugID: string,
        bannerImage:  {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null,
        portfolioImages:  Array< {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
        domainSlug:  {
          __typename: "DomainSlug",
          slug: string,
          freelancerID: string,
          createdAt: string,
          updatedAt: string,
          hireMeInfo:  {
            __typename: "HireMeInfo",
            freelancerID: string,
            name: string | null,
            title: string | null,
            email: string,
            buttonText: string | null,
            blurbText: string | null,
            aboutText: string | null,
            twitterUrl: string | null,
            dribbbleUrl: string | null,
            instagramUrl: string | null,
            linkedInUrl: string | null,
            domainSlugID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateHireMeInfoMutationVariables = {
  input: UpdateHireMeInfoInput,
  condition?: ModelHireMeInfoConditionInput | null,
};

export type UpdateHireMeInfoMutation = {
  updateHireMeInfo:  {
    __typename: "HireMeInfo",
    freelancerID: string,
    name: string | null,
    title: string | null,
    email: string,
    buttonText: string | null,
    blurbText: string | null,
    aboutText: string | null,
    twitterUrl: string | null,
    dribbbleUrl: string | null,
    instagramUrl: string | null,
    linkedInUrl: string | null,
    domainSlugID: string,
    bannerImage:  {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null,
    portfolioImages:  Array< {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    domainSlug:  {
      __typename: "DomainSlug",
      slug: string,
      freelancerID: string,
      createdAt: string,
      updatedAt: string,
      hireMeInfo:  {
        __typename: "HireMeInfo",
        freelancerID: string,
        name: string | null,
        title: string | null,
        email: string,
        buttonText: string | null,
        blurbText: string | null,
        aboutText: string | null,
        twitterUrl: string | null,
        dribbbleUrl: string | null,
        instagramUrl: string | null,
        linkedInUrl: string | null,
        domainSlugID: string,
        bannerImage:  {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null,
        portfolioImages:  Array< {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
        domainSlug:  {
          __typename: "DomainSlug",
          slug: string,
          freelancerID: string,
          createdAt: string,
          updatedAt: string,
          hireMeInfo:  {
            __typename: "HireMeInfo",
            freelancerID: string,
            name: string | null,
            title: string | null,
            email: string,
            buttonText: string | null,
            blurbText: string | null,
            aboutText: string | null,
            twitterUrl: string | null,
            dribbbleUrl: string | null,
            instagramUrl: string | null,
            linkedInUrl: string | null,
            domainSlugID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteHireMeInfoMutationVariables = {
  input: DeleteHireMeInfoInput,
  condition?: ModelHireMeInfoConditionInput | null,
};

export type DeleteHireMeInfoMutation = {
  deleteHireMeInfo:  {
    __typename: "HireMeInfo",
    freelancerID: string,
    name: string | null,
    title: string | null,
    email: string,
    buttonText: string | null,
    blurbText: string | null,
    aboutText: string | null,
    twitterUrl: string | null,
    dribbbleUrl: string | null,
    instagramUrl: string | null,
    linkedInUrl: string | null,
    domainSlugID: string,
    bannerImage:  {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null,
    portfolioImages:  Array< {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    domainSlug:  {
      __typename: "DomainSlug",
      slug: string,
      freelancerID: string,
      createdAt: string,
      updatedAt: string,
      hireMeInfo:  {
        __typename: "HireMeInfo",
        freelancerID: string,
        name: string | null,
        title: string | null,
        email: string,
        buttonText: string | null,
        blurbText: string | null,
        aboutText: string | null,
        twitterUrl: string | null,
        dribbbleUrl: string | null,
        instagramUrl: string | null,
        linkedInUrl: string | null,
        domainSlugID: string,
        bannerImage:  {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null,
        portfolioImages:  Array< {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
        domainSlug:  {
          __typename: "DomainSlug",
          slug: string,
          freelancerID: string,
          createdAt: string,
          updatedAt: string,
          hireMeInfo:  {
            __typename: "HireMeInfo",
            freelancerID: string,
            name: string | null,
            title: string | null,
            email: string,
            buttonText: string | null,
            blurbText: string | null,
            aboutText: string | null,
            twitterUrl: string | null,
            dribbbleUrl: string | null,
            instagramUrl: string | null,
            linkedInUrl: string | null,
            domainSlugID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type CreateDomainSlugMutationVariables = {
  input: CreateDomainSlugInput,
  condition?: ModelDomainSlugConditionInput | null,
};

export type CreateDomainSlugMutation = {
  createDomainSlug:  {
    __typename: "DomainSlug",
    slug: string,
    freelancerID: string,
    createdAt: string,
    updatedAt: string,
    hireMeInfo:  {
      __typename: "HireMeInfo",
      freelancerID: string,
      name: string | null,
      title: string | null,
      email: string,
      buttonText: string | null,
      blurbText: string | null,
      aboutText: string | null,
      twitterUrl: string | null,
      dribbbleUrl: string | null,
      instagramUrl: string | null,
      linkedInUrl: string | null,
      domainSlugID: string,
      bannerImage:  {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null,
      portfolioImages:  Array< {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      domainSlug:  {
        __typename: "DomainSlug",
        slug: string,
        freelancerID: string,
        createdAt: string,
        updatedAt: string,
        hireMeInfo:  {
          __typename: "HireMeInfo",
          freelancerID: string,
          name: string | null,
          title: string | null,
          email: string,
          buttonText: string | null,
          blurbText: string | null,
          aboutText: string | null,
          twitterUrl: string | null,
          dribbbleUrl: string | null,
          instagramUrl: string | null,
          linkedInUrl: string | null,
          domainSlugID: string,
          bannerImage:  {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null,
          portfolioImages:  Array< {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null > | null,
          createdAt: string,
          updatedAt: string,
          domainSlug:  {
            __typename: "DomainSlug",
            slug: string,
            freelancerID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateDomainSlugMutationVariables = {
  input: UpdateDomainSlugInput,
  condition?: ModelDomainSlugConditionInput | null,
};

export type UpdateDomainSlugMutation = {
  updateDomainSlug:  {
    __typename: "DomainSlug",
    slug: string,
    freelancerID: string,
    createdAt: string,
    updatedAt: string,
    hireMeInfo:  {
      __typename: "HireMeInfo",
      freelancerID: string,
      name: string | null,
      title: string | null,
      email: string,
      buttonText: string | null,
      blurbText: string | null,
      aboutText: string | null,
      twitterUrl: string | null,
      dribbbleUrl: string | null,
      instagramUrl: string | null,
      linkedInUrl: string | null,
      domainSlugID: string,
      bannerImage:  {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null,
      portfolioImages:  Array< {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      domainSlug:  {
        __typename: "DomainSlug",
        slug: string,
        freelancerID: string,
        createdAt: string,
        updatedAt: string,
        hireMeInfo:  {
          __typename: "HireMeInfo",
          freelancerID: string,
          name: string | null,
          title: string | null,
          email: string,
          buttonText: string | null,
          blurbText: string | null,
          aboutText: string | null,
          twitterUrl: string | null,
          dribbbleUrl: string | null,
          instagramUrl: string | null,
          linkedInUrl: string | null,
          domainSlugID: string,
          bannerImage:  {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null,
          portfolioImages:  Array< {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null > | null,
          createdAt: string,
          updatedAt: string,
          domainSlug:  {
            __typename: "DomainSlug",
            slug: string,
            freelancerID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteDomainSlugMutationVariables = {
  input: DeleteDomainSlugInput,
  condition?: ModelDomainSlugConditionInput | null,
};

export type DeleteDomainSlugMutation = {
  deleteDomainSlug:  {
    __typename: "DomainSlug",
    slug: string,
    freelancerID: string,
    createdAt: string,
    updatedAt: string,
    hireMeInfo:  {
      __typename: "HireMeInfo",
      freelancerID: string,
      name: string | null,
      title: string | null,
      email: string,
      buttonText: string | null,
      blurbText: string | null,
      aboutText: string | null,
      twitterUrl: string | null,
      dribbbleUrl: string | null,
      instagramUrl: string | null,
      linkedInUrl: string | null,
      domainSlugID: string,
      bannerImage:  {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null,
      portfolioImages:  Array< {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      domainSlug:  {
        __typename: "DomainSlug",
        slug: string,
        freelancerID: string,
        createdAt: string,
        updatedAt: string,
        hireMeInfo:  {
          __typename: "HireMeInfo",
          freelancerID: string,
          name: string | null,
          title: string | null,
          email: string,
          buttonText: string | null,
          blurbText: string | null,
          aboutText: string | null,
          twitterUrl: string | null,
          dribbbleUrl: string | null,
          instagramUrl: string | null,
          linkedInUrl: string | null,
          domainSlugID: string,
          bannerImage:  {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null,
          portfolioImages:  Array< {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null > | null,
          createdAt: string,
          updatedAt: string,
          domainSlug:  {
            __typename: "DomainSlug",
            slug: string,
            freelancerID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    company: string | null,
    email: string | null,
    phone: string | null,
    signedOutAuthToken: string | null,
    role: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetProjectClientQueryVariables = {
  id: string,
};

export type GetProjectClientQuery = {
  getProjectClient:  {
    __typename: "ProjectClient",
    id: string,
    clientID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListProjectClientsQueryVariables = {
  filter?: ModelProjectClientFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectClientsQuery = {
  listProjectClients:  {
    __typename: "ModelProjectClientConnection",
    items:  Array< {
      __typename: "ProjectClient",
      id: string,
      clientID: string,
      projectID: string,
      title: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        name: string | null,
        company: string | null,
        email: string | null,
        phone: string | null,
        signedOutAuthToken: string | null,
        role: UserRole,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetProjectFreelancerQueryVariables = {
  id: string,
};

export type GetProjectFreelancerQuery = {
  getProjectFreelancer:  {
    __typename: "ProjectFreelancer",
    id: string,
    freelancerID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListProjectFreelancersQueryVariables = {
  filter?: ModelProjectFreelancerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectFreelancersQuery = {
  listProjectFreelancers:  {
    __typename: "ModelProjectFreelancerConnection",
    items:  Array< {
      __typename: "ProjectFreelancer",
      id: string,
      freelancerID: string,
      projectID: string,
      title: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        name: string | null,
        company: string | null,
        email: string | null,
        phone: string | null,
        signedOutAuthToken: string | null,
        role: UserRole,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject:  {
    __typename: "Project",
    id: string,
    createdAt: string,
    owner: string,
    freelancerID: string,
    clientID: string,
    details: string | null,
    updatedAt: string,
    freelancer:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    client:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    clients:  {
      __typename: "ModelProjectClientConnection",
      items:  Array< {
        __typename: "ProjectClient",
        id: string,
        clientID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    freelancers:  {
      __typename: "ModelProjectFreelancerConnection",
      items:  Array< {
        __typename: "ProjectFreelancer",
        id: string,
        freelancerID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            completed: boolean,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        createdAt: string,
        projectID: string,
        content: string,
        creatorID: string,
        updatedAt: string,
        creator:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      createdAt: string,
      owner: string,
      freelancerID: string,
      clientID: string,
      details: string | null,
      updatedAt: string,
      freelancer:  {
        __typename: "User",
        id: string,
        name: string | null,
        company: string | null,
        email: string | null,
        phone: string | null,
        signedOutAuthToken: string | null,
        role: UserRole,
        createdAt: string,
        updatedAt: string,
      } | null,
      client:  {
        __typename: "User",
        id: string,
        name: string | null,
        company: string | null,
        email: string | null,
        phone: string | null,
        signedOutAuthToken: string | null,
        role: UserRole,
        createdAt: string,
        updatedAt: string,
      } | null,
      clients:  {
        __typename: "ModelProjectClientConnection",
        items:  Array< {
          __typename: "ProjectClient",
          id: string,
          clientID: string,
          projectID: string,
          title: string | null,
          createdAt: string,
          updatedAt: string,
          user:  {
            __typename: "User",
            id: string,
            name: string | null,
            company: string | null,
            email: string | null,
            phone: string | null,
            signedOutAuthToken: string | null,
            role: UserRole,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      freelancers:  {
        __typename: "ModelProjectFreelancerConnection",
        items:  Array< {
          __typename: "ProjectFreelancer",
          id: string,
          freelancerID: string,
          projectID: string,
          title: string | null,
          createdAt: string,
          updatedAt: string,
          user:  {
            __typename: "User",
            id: string,
            name: string | null,
            company: string | null,
            email: string | null,
            phone: string | null,
            signedOutAuthToken: string | null,
            role: UserRole,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      quotes:  {
        __typename: "ModelQuoteConnection",
        items:  Array< {
          __typename: "Quote",
          id: string,
          projectID: string,
          createdAt: string,
          updatedAt: string,
          tasks:  {
            __typename: "ModelTaskConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          createdAt: string,
          projectID: string,
          content: string,
          creatorID: string,
          updatedAt: string,
          creator:  {
            __typename: "User",
            id: string,
            name: string | null,
            company: string | null,
            email: string | null,
            phone: string | null,
            signedOutAuthToken: string | null,
            role: UserRole,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ProjectsByFreelancerQueryVariables = {
  freelancerID?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProjectsByFreelancerQuery = {
  projectsByFreelancer:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      createdAt: string,
      owner: string,
      freelancerID: string,
      clientID: string,
      details: string | null,
      updatedAt: string,
      freelancer:  {
        __typename: "User",
        id: string,
        name: string | null,
        company: string | null,
        email: string | null,
        phone: string | null,
        signedOutAuthToken: string | null,
        role: UserRole,
        createdAt: string,
        updatedAt: string,
      } | null,
      client:  {
        __typename: "User",
        id: string,
        name: string | null,
        company: string | null,
        email: string | null,
        phone: string | null,
        signedOutAuthToken: string | null,
        role: UserRole,
        createdAt: string,
        updatedAt: string,
      } | null,
      clients:  {
        __typename: "ModelProjectClientConnection",
        items:  Array< {
          __typename: "ProjectClient",
          id: string,
          clientID: string,
          projectID: string,
          title: string | null,
          createdAt: string,
          updatedAt: string,
          user:  {
            __typename: "User",
            id: string,
            name: string | null,
            company: string | null,
            email: string | null,
            phone: string | null,
            signedOutAuthToken: string | null,
            role: UserRole,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      freelancers:  {
        __typename: "ModelProjectFreelancerConnection",
        items:  Array< {
          __typename: "ProjectFreelancer",
          id: string,
          freelancerID: string,
          projectID: string,
          title: string | null,
          createdAt: string,
          updatedAt: string,
          user:  {
            __typename: "User",
            id: string,
            name: string | null,
            company: string | null,
            email: string | null,
            phone: string | null,
            signedOutAuthToken: string | null,
            role: UserRole,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      quotes:  {
        __typename: "ModelQuoteConnection",
        items:  Array< {
          __typename: "Quote",
          id: string,
          projectID: string,
          createdAt: string,
          updatedAt: string,
          tasks:  {
            __typename: "ModelTaskConnection",
            nextToken: string | null,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          createdAt: string,
          projectID: string,
          content: string,
          creatorID: string,
          updatedAt: string,
          creator:  {
            __typename: "User",
            id: string,
            name: string | null,
            company: string | null,
            email: string | null,
            phone: string | null,
            signedOutAuthToken: string | null,
            role: UserRole,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetQuoteQueryVariables = {
  id: string,
};

export type GetQuoteQuery = {
  getQuote:  {
    __typename: "Quote",
    id: string,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        completed: boolean,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListQuotesQueryVariables = {
  filter?: ModelQuoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuotesQuery = {
  listQuotes:  {
    __typename: "ModelQuoteConnection",
    items:  Array< {
      __typename: "Quote",
      id: string,
      projectID: string,
      createdAt: string,
      updatedAt: string,
      tasks:  {
        __typename: "ModelTaskConnection",
        items:  Array< {
          __typename: "Task",
          id: string,
          quoteID: string,
          text: string,
          completed: boolean,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment:  {
    __typename: "Comment",
    id: string,
    createdAt: string,
    projectID: string,
    content: string,
    creatorID: string,
    updatedAt: string,
    creator:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      createdAt: string,
      projectID: string,
      content: string,
      creatorID: string,
      updatedAt: string,
      creator:  {
        __typename: "User",
        id: string,
        name: string | null,
        company: string | null,
        email: string | null,
        phone: string | null,
        signedOutAuthToken: string | null,
        role: UserRole,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTaskQueryVariables = {
  id: string,
};

export type GetTaskQuery = {
  getTask:  {
    __typename: "Task",
    id: string,
    quoteID: string,
    text: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTasksQueryVariables = {
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTasksQuery = {
  listTasks:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      id: string,
      quoteID: string,
      text: string,
      completed: boolean,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListHireMeInfosQueryVariables = {
  freelancerID?: string | null,
  filter?: ModelHireMeInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListHireMeInfosQuery = {
  listHireMeInfos:  {
    __typename: "ModelHireMeInfoConnection",
    items:  Array< {
      __typename: "HireMeInfo",
      freelancerID: string,
      name: string | null,
      title: string | null,
      email: string,
      buttonText: string | null,
      blurbText: string | null,
      aboutText: string | null,
      twitterUrl: string | null,
      dribbbleUrl: string | null,
      instagramUrl: string | null,
      linkedInUrl: string | null,
      domainSlugID: string,
      bannerImage:  {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null,
      portfolioImages:  Array< {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      domainSlug:  {
        __typename: "DomainSlug",
        slug: string,
        freelancerID: string,
        createdAt: string,
        updatedAt: string,
        hireMeInfo:  {
          __typename: "HireMeInfo",
          freelancerID: string,
          name: string | null,
          title: string | null,
          email: string,
          buttonText: string | null,
          blurbText: string | null,
          aboutText: string | null,
          twitterUrl: string | null,
          dribbbleUrl: string | null,
          instagramUrl: string | null,
          linkedInUrl: string | null,
          domainSlugID: string,
          bannerImage:  {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null,
          portfolioImages:  Array< {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null > | null,
          createdAt: string,
          updatedAt: string,
          domainSlug:  {
            __typename: "DomainSlug",
            slug: string,
            freelancerID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetHireMeInfoQueryVariables = {
  freelancerID: string,
};

export type GetHireMeInfoQuery = {
  getHireMeInfo:  {
    __typename: "HireMeInfo",
    freelancerID: string,
    name: string | null,
    title: string | null,
    email: string,
    buttonText: string | null,
    blurbText: string | null,
    aboutText: string | null,
    twitterUrl: string | null,
    dribbbleUrl: string | null,
    instagramUrl: string | null,
    linkedInUrl: string | null,
    domainSlugID: string,
    bannerImage:  {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null,
    portfolioImages:  Array< {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    domainSlug:  {
      __typename: "DomainSlug",
      slug: string,
      freelancerID: string,
      createdAt: string,
      updatedAt: string,
      hireMeInfo:  {
        __typename: "HireMeInfo",
        freelancerID: string,
        name: string | null,
        title: string | null,
        email: string,
        buttonText: string | null,
        blurbText: string | null,
        aboutText: string | null,
        twitterUrl: string | null,
        dribbbleUrl: string | null,
        instagramUrl: string | null,
        linkedInUrl: string | null,
        domainSlugID: string,
        bannerImage:  {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null,
        portfolioImages:  Array< {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
        domainSlug:  {
          __typename: "DomainSlug",
          slug: string,
          freelancerID: string,
          createdAt: string,
          updatedAt: string,
          hireMeInfo:  {
            __typename: "HireMeInfo",
            freelancerID: string,
            name: string | null,
            title: string | null,
            email: string,
            buttonText: string | null,
            blurbText: string | null,
            aboutText: string | null,
            twitterUrl: string | null,
            dribbbleUrl: string | null,
            instagramUrl: string | null,
            linkedInUrl: string | null,
            domainSlugID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type HireInfoByDomainSlugQueryVariables = {
  domainSlugID?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelHireMeInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type HireInfoByDomainSlugQuery = {
  hireInfoByDomainSlug:  {
    __typename: "ModelHireMeInfoConnection",
    items:  Array< {
      __typename: "HireMeInfo",
      freelancerID: string,
      name: string | null,
      title: string | null,
      email: string,
      buttonText: string | null,
      blurbText: string | null,
      aboutText: string | null,
      twitterUrl: string | null,
      dribbbleUrl: string | null,
      instagramUrl: string | null,
      linkedInUrl: string | null,
      domainSlugID: string,
      bannerImage:  {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null,
      portfolioImages:  Array< {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      domainSlug:  {
        __typename: "DomainSlug",
        slug: string,
        freelancerID: string,
        createdAt: string,
        updatedAt: string,
        hireMeInfo:  {
          __typename: "HireMeInfo",
          freelancerID: string,
          name: string | null,
          title: string | null,
          email: string,
          buttonText: string | null,
          blurbText: string | null,
          aboutText: string | null,
          twitterUrl: string | null,
          dribbbleUrl: string | null,
          instagramUrl: string | null,
          linkedInUrl: string | null,
          domainSlugID: string,
          bannerImage:  {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null,
          portfolioImages:  Array< {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null > | null,
          createdAt: string,
          updatedAt: string,
          domainSlug:  {
            __typename: "DomainSlug",
            slug: string,
            freelancerID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListDomainSlugsQueryVariables = {
  slug?: string | null,
  filter?: ModelDomainSlugFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDomainSlugsQuery = {
  listDomainSlugs:  {
    __typename: "ModelDomainSlugConnection",
    items:  Array< {
      __typename: "DomainSlug",
      slug: string,
      freelancerID: string,
      createdAt: string,
      updatedAt: string,
      hireMeInfo:  {
        __typename: "HireMeInfo",
        freelancerID: string,
        name: string | null,
        title: string | null,
        email: string,
        buttonText: string | null,
        blurbText: string | null,
        aboutText: string | null,
        twitterUrl: string | null,
        dribbbleUrl: string | null,
        instagramUrl: string | null,
        linkedInUrl: string | null,
        domainSlugID: string,
        bannerImage:  {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null,
        portfolioImages:  Array< {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
        domainSlug:  {
          __typename: "DomainSlug",
          slug: string,
          freelancerID: string,
          createdAt: string,
          updatedAt: string,
          hireMeInfo:  {
            __typename: "HireMeInfo",
            freelancerID: string,
            name: string | null,
            title: string | null,
            email: string,
            buttonText: string | null,
            blurbText: string | null,
            aboutText: string | null,
            twitterUrl: string | null,
            dribbbleUrl: string | null,
            instagramUrl: string | null,
            linkedInUrl: string | null,
            domainSlugID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetDomainSlugQueryVariables = {
  slug: string,
};

export type GetDomainSlugQuery = {
  getDomainSlug:  {
    __typename: "DomainSlug",
    slug: string,
    freelancerID: string,
    createdAt: string,
    updatedAt: string,
    hireMeInfo:  {
      __typename: "HireMeInfo",
      freelancerID: string,
      name: string | null,
      title: string | null,
      email: string,
      buttonText: string | null,
      blurbText: string | null,
      aboutText: string | null,
      twitterUrl: string | null,
      dribbbleUrl: string | null,
      instagramUrl: string | null,
      linkedInUrl: string | null,
      domainSlugID: string,
      bannerImage:  {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null,
      portfolioImages:  Array< {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      domainSlug:  {
        __typename: "DomainSlug",
        slug: string,
        freelancerID: string,
        createdAt: string,
        updatedAt: string,
        hireMeInfo:  {
          __typename: "HireMeInfo",
          freelancerID: string,
          name: string | null,
          title: string | null,
          email: string,
          buttonText: string | null,
          blurbText: string | null,
          aboutText: string | null,
          twitterUrl: string | null,
          dribbbleUrl: string | null,
          instagramUrl: string | null,
          linkedInUrl: string | null,
          domainSlugID: string,
          bannerImage:  {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null,
          portfolioImages:  Array< {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null > | null,
          createdAt: string,
          updatedAt: string,
          domainSlug:  {
            __typename: "DomainSlug",
            slug: string,
            freelancerID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    company: string | null,
    email: string | null,
    phone: string | null,
    signedOutAuthToken: string | null,
    role: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    company: string | null,
    email: string | null,
    phone: string | null,
    signedOutAuthToken: string | null,
    role: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    company: string | null,
    email: string | null,
    phone: string | null,
    signedOutAuthToken: string | null,
    role: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProjectClientSubscription = {
  onCreateProjectClient:  {
    __typename: "ProjectClient",
    id: string,
    clientID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateProjectClientSubscription = {
  onUpdateProjectClient:  {
    __typename: "ProjectClient",
    id: string,
    clientID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteProjectClientSubscription = {
  onDeleteProjectClient:  {
    __typename: "ProjectClient",
    id: string,
    clientID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateProjectFreelancerSubscription = {
  onCreateProjectFreelancer:  {
    __typename: "ProjectFreelancer",
    id: string,
    freelancerID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateProjectFreelancerSubscription = {
  onUpdateProjectFreelancer:  {
    __typename: "ProjectFreelancer",
    id: string,
    freelancerID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteProjectFreelancerSubscription = {
  onDeleteProjectFreelancer:  {
    __typename: "ProjectFreelancer",
    id: string,
    freelancerID: string,
    projectID: string,
    title: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject:  {
    __typename: "Project",
    id: string,
    createdAt: string,
    owner: string,
    freelancerID: string,
    clientID: string,
    details: string | null,
    updatedAt: string,
    freelancer:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    client:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    clients:  {
      __typename: "ModelProjectClientConnection",
      items:  Array< {
        __typename: "ProjectClient",
        id: string,
        clientID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    freelancers:  {
      __typename: "ModelProjectFreelancerConnection",
      items:  Array< {
        __typename: "ProjectFreelancer",
        id: string,
        freelancerID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            completed: boolean,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        createdAt: string,
        projectID: string,
        content: string,
        creatorID: string,
        updatedAt: string,
        creator:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject:  {
    __typename: "Project",
    id: string,
    createdAt: string,
    owner: string,
    freelancerID: string,
    clientID: string,
    details: string | null,
    updatedAt: string,
    freelancer:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    client:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    clients:  {
      __typename: "ModelProjectClientConnection",
      items:  Array< {
        __typename: "ProjectClient",
        id: string,
        clientID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    freelancers:  {
      __typename: "ModelProjectFreelancerConnection",
      items:  Array< {
        __typename: "ProjectFreelancer",
        id: string,
        freelancerID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            completed: boolean,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        createdAt: string,
        projectID: string,
        content: string,
        creatorID: string,
        updatedAt: string,
        creator:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject:  {
    __typename: "Project",
    id: string,
    createdAt: string,
    owner: string,
    freelancerID: string,
    clientID: string,
    details: string | null,
    updatedAt: string,
    freelancer:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    client:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    clients:  {
      __typename: "ModelProjectClientConnection",
      items:  Array< {
        __typename: "ProjectClient",
        id: string,
        clientID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    freelancers:  {
      __typename: "ModelProjectFreelancerConnection",
      items:  Array< {
        __typename: "ProjectFreelancer",
        id: string,
        freelancerID: string,
        projectID: string,
        title: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        createdAt: string,
        updatedAt: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            completed: boolean,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        createdAt: string,
        projectID: string,
        content: string,
        creatorID: string,
        updatedAt: string,
        creator:  {
          __typename: "User",
          id: string,
          name: string | null,
          company: string | null,
          email: string | null,
          phone: string | null,
          signedOutAuthToken: string | null,
          role: UserRole,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateQuoteSubscription = {
  onCreateQuote:  {
    __typename: "Quote",
    id: string,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        completed: boolean,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateQuoteSubscription = {
  onUpdateQuote:  {
    __typename: "Quote",
    id: string,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        completed: boolean,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteQuoteSubscription = {
  onDeleteQuote:  {
    __typename: "Quote",
    id: string,
    projectID: string,
    createdAt: string,
    updatedAt: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        completed: boolean,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment:  {
    __typename: "Comment",
    id: string,
    createdAt: string,
    projectID: string,
    content: string,
    creatorID: string,
    updatedAt: string,
    creator:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment:  {
    __typename: "Comment",
    id: string,
    createdAt: string,
    projectID: string,
    content: string,
    creatorID: string,
    updatedAt: string,
    creator:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment:  {
    __typename: "Comment",
    id: string,
    createdAt: string,
    projectID: string,
    content: string,
    creatorID: string,
    updatedAt: string,
    creator:  {
      __typename: "User",
      id: string,
      name: string | null,
      company: string | null,
      email: string | null,
      phone: string | null,
      signedOutAuthToken: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateTaskSubscription = {
  onCreateTask:  {
    __typename: "Task",
    id: string,
    quoteID: string,
    text: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTaskSubscription = {
  onUpdateTask:  {
    __typename: "Task",
    id: string,
    quoteID: string,
    text: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTaskSubscription = {
  onDeleteTask:  {
    __typename: "Task",
    id: string,
    quoteID: string,
    text: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateHireMeInfoSubscription = {
  onCreateHireMeInfo:  {
    __typename: "HireMeInfo",
    freelancerID: string,
    name: string | null,
    title: string | null,
    email: string,
    buttonText: string | null,
    blurbText: string | null,
    aboutText: string | null,
    twitterUrl: string | null,
    dribbbleUrl: string | null,
    instagramUrl: string | null,
    linkedInUrl: string | null,
    domainSlugID: string,
    bannerImage:  {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null,
    portfolioImages:  Array< {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    domainSlug:  {
      __typename: "DomainSlug",
      slug: string,
      freelancerID: string,
      createdAt: string,
      updatedAt: string,
      hireMeInfo:  {
        __typename: "HireMeInfo",
        freelancerID: string,
        name: string | null,
        title: string | null,
        email: string,
        buttonText: string | null,
        blurbText: string | null,
        aboutText: string | null,
        twitterUrl: string | null,
        dribbbleUrl: string | null,
        instagramUrl: string | null,
        linkedInUrl: string | null,
        domainSlugID: string,
        bannerImage:  {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null,
        portfolioImages:  Array< {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
        domainSlug:  {
          __typename: "DomainSlug",
          slug: string,
          freelancerID: string,
          createdAt: string,
          updatedAt: string,
          hireMeInfo:  {
            __typename: "HireMeInfo",
            freelancerID: string,
            name: string | null,
            title: string | null,
            email: string,
            buttonText: string | null,
            blurbText: string | null,
            aboutText: string | null,
            twitterUrl: string | null,
            dribbbleUrl: string | null,
            instagramUrl: string | null,
            linkedInUrl: string | null,
            domainSlugID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateHireMeInfoSubscription = {
  onUpdateHireMeInfo:  {
    __typename: "HireMeInfo",
    freelancerID: string,
    name: string | null,
    title: string | null,
    email: string,
    buttonText: string | null,
    blurbText: string | null,
    aboutText: string | null,
    twitterUrl: string | null,
    dribbbleUrl: string | null,
    instagramUrl: string | null,
    linkedInUrl: string | null,
    domainSlugID: string,
    bannerImage:  {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null,
    portfolioImages:  Array< {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    domainSlug:  {
      __typename: "DomainSlug",
      slug: string,
      freelancerID: string,
      createdAt: string,
      updatedAt: string,
      hireMeInfo:  {
        __typename: "HireMeInfo",
        freelancerID: string,
        name: string | null,
        title: string | null,
        email: string,
        buttonText: string | null,
        blurbText: string | null,
        aboutText: string | null,
        twitterUrl: string | null,
        dribbbleUrl: string | null,
        instagramUrl: string | null,
        linkedInUrl: string | null,
        domainSlugID: string,
        bannerImage:  {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null,
        portfolioImages:  Array< {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
        domainSlug:  {
          __typename: "DomainSlug",
          slug: string,
          freelancerID: string,
          createdAt: string,
          updatedAt: string,
          hireMeInfo:  {
            __typename: "HireMeInfo",
            freelancerID: string,
            name: string | null,
            title: string | null,
            email: string,
            buttonText: string | null,
            blurbText: string | null,
            aboutText: string | null,
            twitterUrl: string | null,
            dribbbleUrl: string | null,
            instagramUrl: string | null,
            linkedInUrl: string | null,
            domainSlugID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteHireMeInfoSubscription = {
  onDeleteHireMeInfo:  {
    __typename: "HireMeInfo",
    freelancerID: string,
    name: string | null,
    title: string | null,
    email: string,
    buttonText: string | null,
    blurbText: string | null,
    aboutText: string | null,
    twitterUrl: string | null,
    dribbbleUrl: string | null,
    instagramUrl: string | null,
    linkedInUrl: string | null,
    domainSlugID: string,
    bannerImage:  {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null,
    portfolioImages:  Array< {
      __typename: "S3Object",
      key: string,
      tag: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    domainSlug:  {
      __typename: "DomainSlug",
      slug: string,
      freelancerID: string,
      createdAt: string,
      updatedAt: string,
      hireMeInfo:  {
        __typename: "HireMeInfo",
        freelancerID: string,
        name: string | null,
        title: string | null,
        email: string,
        buttonText: string | null,
        blurbText: string | null,
        aboutText: string | null,
        twitterUrl: string | null,
        dribbbleUrl: string | null,
        instagramUrl: string | null,
        linkedInUrl: string | null,
        domainSlugID: string,
        bannerImage:  {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null,
        portfolioImages:  Array< {
          __typename: "S3Object",
          key: string,
          tag: string | null,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
        domainSlug:  {
          __typename: "DomainSlug",
          slug: string,
          freelancerID: string,
          createdAt: string,
          updatedAt: string,
          hireMeInfo:  {
            __typename: "HireMeInfo",
            freelancerID: string,
            name: string | null,
            title: string | null,
            email: string,
            buttonText: string | null,
            blurbText: string | null,
            aboutText: string | null,
            twitterUrl: string | null,
            dribbbleUrl: string | null,
            instagramUrl: string | null,
            linkedInUrl: string | null,
            domainSlugID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type OnCreateDomainSlugSubscription = {
  onCreateDomainSlug:  {
    __typename: "DomainSlug",
    slug: string,
    freelancerID: string,
    createdAt: string,
    updatedAt: string,
    hireMeInfo:  {
      __typename: "HireMeInfo",
      freelancerID: string,
      name: string | null,
      title: string | null,
      email: string,
      buttonText: string | null,
      blurbText: string | null,
      aboutText: string | null,
      twitterUrl: string | null,
      dribbbleUrl: string | null,
      instagramUrl: string | null,
      linkedInUrl: string | null,
      domainSlugID: string,
      bannerImage:  {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null,
      portfolioImages:  Array< {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      domainSlug:  {
        __typename: "DomainSlug",
        slug: string,
        freelancerID: string,
        createdAt: string,
        updatedAt: string,
        hireMeInfo:  {
          __typename: "HireMeInfo",
          freelancerID: string,
          name: string | null,
          title: string | null,
          email: string,
          buttonText: string | null,
          blurbText: string | null,
          aboutText: string | null,
          twitterUrl: string | null,
          dribbbleUrl: string | null,
          instagramUrl: string | null,
          linkedInUrl: string | null,
          domainSlugID: string,
          bannerImage:  {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null,
          portfolioImages:  Array< {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null > | null,
          createdAt: string,
          updatedAt: string,
          domainSlug:  {
            __typename: "DomainSlug",
            slug: string,
            freelancerID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateDomainSlugSubscription = {
  onUpdateDomainSlug:  {
    __typename: "DomainSlug",
    slug: string,
    freelancerID: string,
    createdAt: string,
    updatedAt: string,
    hireMeInfo:  {
      __typename: "HireMeInfo",
      freelancerID: string,
      name: string | null,
      title: string | null,
      email: string,
      buttonText: string | null,
      blurbText: string | null,
      aboutText: string | null,
      twitterUrl: string | null,
      dribbbleUrl: string | null,
      instagramUrl: string | null,
      linkedInUrl: string | null,
      domainSlugID: string,
      bannerImage:  {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null,
      portfolioImages:  Array< {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      domainSlug:  {
        __typename: "DomainSlug",
        slug: string,
        freelancerID: string,
        createdAt: string,
        updatedAt: string,
        hireMeInfo:  {
          __typename: "HireMeInfo",
          freelancerID: string,
          name: string | null,
          title: string | null,
          email: string,
          buttonText: string | null,
          blurbText: string | null,
          aboutText: string | null,
          twitterUrl: string | null,
          dribbbleUrl: string | null,
          instagramUrl: string | null,
          linkedInUrl: string | null,
          domainSlugID: string,
          bannerImage:  {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null,
          portfolioImages:  Array< {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null > | null,
          createdAt: string,
          updatedAt: string,
          domainSlug:  {
            __typename: "DomainSlug",
            slug: string,
            freelancerID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteDomainSlugSubscription = {
  onDeleteDomainSlug:  {
    __typename: "DomainSlug",
    slug: string,
    freelancerID: string,
    createdAt: string,
    updatedAt: string,
    hireMeInfo:  {
      __typename: "HireMeInfo",
      freelancerID: string,
      name: string | null,
      title: string | null,
      email: string,
      buttonText: string | null,
      blurbText: string | null,
      aboutText: string | null,
      twitterUrl: string | null,
      dribbbleUrl: string | null,
      instagramUrl: string | null,
      linkedInUrl: string | null,
      domainSlugID: string,
      bannerImage:  {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null,
      portfolioImages:  Array< {
        __typename: "S3Object",
        key: string,
        tag: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      domainSlug:  {
        __typename: "DomainSlug",
        slug: string,
        freelancerID: string,
        createdAt: string,
        updatedAt: string,
        hireMeInfo:  {
          __typename: "HireMeInfo",
          freelancerID: string,
          name: string | null,
          title: string | null,
          email: string,
          buttonText: string | null,
          blurbText: string | null,
          aboutText: string | null,
          twitterUrl: string | null,
          dribbbleUrl: string | null,
          instagramUrl: string | null,
          linkedInUrl: string | null,
          domainSlugID: string,
          bannerImage:  {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null,
          portfolioImages:  Array< {
            __typename: "S3Object",
            key: string,
            tag: string | null,
          } | null > | null,
          createdAt: string,
          updatedAt: string,
          domainSlug:  {
            __typename: "DomainSlug",
            slug: string,
            freelancerID: string,
            createdAt: string,
            updatedAt: string,
          } | null,
        } | null,
      } | null,
    } | null,
  } | null,
};
