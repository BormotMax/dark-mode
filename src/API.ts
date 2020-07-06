/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
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

export type UpdateUserInput = {
  id: string,
  name?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateProjectInput = {
  id?: string | null,
  freelancerID: string,
  clientID: string,
  initialContact?: InitialContactInput | null,
};

export type InitialContactInput = {
  message: string,
};

export type ModelProjectConditionInput = {
  freelancerID?: ModelIDInput | null,
  clientID?: ModelIDInput | null,
  and?: Array< ModelProjectConditionInput | null > | null,
  or?: Array< ModelProjectConditionInput | null > | null,
  not?: ModelProjectConditionInput | null,
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

export type UpdateProjectInput = {
  id: string,
  freelancerID?: string | null,
  clientID?: string | null,
  initialContact?: InitialContactInput | null,
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
  projectID: string,
  content: string,
  creatorID: string,
};

export type ModelCommentConditionInput = {
  projectID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  creatorID?: ModelIDInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
};

export type UpdateCommentInput = {
  id: string,
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
};

export type ModelTaskConditionInput = {
  quoteID?: ModelIDInput | null,
  text?: ModelStringInput | null,
  and?: Array< ModelTaskConditionInput | null > | null,
  or?: Array< ModelTaskConditionInput | null > | null,
  not?: ModelTaskConditionInput | null,
};

export type UpdateTaskInput = {
  id: string,
  quoteID?: string | null,
  text?: string | null,
};

export type DeleteTaskInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  freelancerID?: ModelIDInput | null,
  clientID?: ModelIDInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelQuoteFilterInput = {
  id?: ModelIDInput | null,
  projectID?: ModelIDInput | null,
  and?: Array< ModelQuoteFilterInput | null > | null,
  or?: Array< ModelQuoteFilterInput | null > | null,
  not?: ModelQuoteFilterInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
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
  and?: Array< ModelTaskFilterInput | null > | null,
  or?: Array< ModelTaskFilterInput | null > | null,
  not?: ModelTaskFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        freelancerID: string,
        freelancer:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        clientID: string,
        client:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            projectID: string,
            content: string,
            creatorID: string,
            createdAt: string,
            updatedAt: string,
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
          } | null > | null,
          nextToken: string | null,
        } | null,
        initialContact:  {
          __typename: "InitialContact",
          message: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    name: string | null,
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
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        freelancerID: string,
        freelancer:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        clientID: string,
        client:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            projectID: string,
            content: string,
            creatorID: string,
            createdAt: string,
            updatedAt: string,
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
          } | null > | null,
          nextToken: string | null,
        } | null,
        initialContact:  {
          __typename: "InitialContact",
          message: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    name: string | null,
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
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        freelancerID: string,
        freelancer:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        clientID: string,
        client:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            projectID: string,
            content: string,
            creatorID: string,
            createdAt: string,
            updatedAt: string,
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
          } | null > | null,
          nextToken: string | null,
        } | null,
        initialContact:  {
          __typename: "InitialContact",
          message: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    name: string | null,
    createdAt: string,
    updatedAt: string,
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
    freelancerID: string,
    freelancer:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    clientID: string,
    client:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        projectID: string,
        content: string,
        creatorID: string,
        creator:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        },
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    initialContact:  {
      __typename: "InitialContact",
      message: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    freelancerID: string,
    freelancer:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    clientID: string,
    client:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        projectID: string,
        content: string,
        creatorID: string,
        creator:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        },
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    initialContact:  {
      __typename: "InitialContact",
      message: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    freelancerID: string,
    freelancer:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    clientID: string,
    client:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        projectID: string,
        content: string,
        creatorID: string,
        creator:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        },
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    initialContact:  {
      __typename: "InitialContact",
      message: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    projectID: string,
    content: string,
    creatorID: string,
    creator:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
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
    projectID: string,
    content: string,
    creatorID: string,
    creator:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
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
    projectID: string,
    content: string,
    creatorID: string,
    creator:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
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
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        freelancerID: string,
        freelancer:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        clientID: string,
        client:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            projectID: string,
            content: string,
            creatorID: string,
            createdAt: string,
            updatedAt: string,
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
          } | null > | null,
          nextToken: string | null,
        } | null,
        initialContact:  {
          __typename: "InitialContact",
          message: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    name: string | null,
    createdAt: string,
    updatedAt: string,
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
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
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
    freelancerID: string,
    freelancer:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    clientID: string,
    client:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        projectID: string,
        content: string,
        creatorID: string,
        creator:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        },
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    initialContact:  {
      __typename: "InitialContact",
      message: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      freelancerID: string,
      freelancer:  {
        __typename: "User",
        id: string,
        projects:  {
          __typename: "ModelProjectConnection",
          items:  Array< {
            __typename: "Project",
            id: string,
            freelancerID: string,
            clientID: string,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        name: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      clientID: string,
      client:  {
        __typename: "User",
        id: string,
        projects:  {
          __typename: "ModelProjectConnection",
          items:  Array< {
            __typename: "Project",
            id: string,
            freelancerID: string,
            clientID: string,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        name: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          projectID: string,
          content: string,
          creatorID: string,
          creator:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          },
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      quotes:  {
        __typename: "ModelQuoteConnection",
        items:  Array< {
          __typename: "Quote",
          id: string,
          projectID: string,
          tasks:  {
            __typename: "ModelTaskConnection",
            nextToken: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      initialContact:  {
        __typename: "InitialContact",
        message: string,
      } | null,
      createdAt: string,
      updatedAt: string,
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
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      tasks:  {
        __typename: "ModelTaskConnection",
        items:  Array< {
          __typename: "Task",
          id: string,
          quoteID: string,
          text: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
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
    projectID: string,
    content: string,
    creatorID: string,
    creator:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
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
      projectID: string,
      content: string,
      creatorID: string,
      creator:  {
        __typename: "User",
        id: string,
        projects:  {
          __typename: "ModelProjectConnection",
          items:  Array< {
            __typename: "Project",
            id: string,
            freelancerID: string,
            clientID: string,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        name: string | null,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ProjectsByFreelancerQueryVariables = {
  freelancerID?: string | null,
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
      freelancerID: string,
      freelancer:  {
        __typename: "User",
        id: string,
        projects:  {
          __typename: "ModelProjectConnection",
          items:  Array< {
            __typename: "Project",
            id: string,
            freelancerID: string,
            clientID: string,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        name: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      clientID: string,
      client:  {
        __typename: "User",
        id: string,
        projects:  {
          __typename: "ModelProjectConnection",
          items:  Array< {
            __typename: "Project",
            id: string,
            freelancerID: string,
            clientID: string,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        name: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      comments:  {
        __typename: "ModelCommentConnection",
        items:  Array< {
          __typename: "Comment",
          id: string,
          projectID: string,
          content: string,
          creatorID: string,
          creator:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          },
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      quotes:  {
        __typename: "ModelQuoteConnection",
        items:  Array< {
          __typename: "Quote",
          id: string,
          projectID: string,
          tasks:  {
            __typename: "ModelTaskConnection",
            nextToken: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      initialContact:  {
        __typename: "InitialContact",
        message: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        freelancerID: string,
        freelancer:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        clientID: string,
        client:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            projectID: string,
            content: string,
            creatorID: string,
            createdAt: string,
            updatedAt: string,
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
          } | null > | null,
          nextToken: string | null,
        } | null,
        initialContact:  {
          __typename: "InitialContact",
          message: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    name: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        freelancerID: string,
        freelancer:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        clientID: string,
        client:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            projectID: string,
            content: string,
            creatorID: string,
            createdAt: string,
            updatedAt: string,
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
          } | null > | null,
          nextToken: string | null,
        } | null,
        initialContact:  {
          __typename: "InitialContact",
          message: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    name: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    projects:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        freelancerID: string,
        freelancer:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        clientID: string,
        client:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        comments:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            projectID: string,
            content: string,
            creatorID: string,
            createdAt: string,
            updatedAt: string,
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
          } | null > | null,
          nextToken: string | null,
        } | null,
        initialContact:  {
          __typename: "InitialContact",
          message: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    name: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject:  {
    __typename: "Project",
    id: string,
    freelancerID: string,
    freelancer:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    clientID: string,
    client:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        projectID: string,
        content: string,
        creatorID: string,
        creator:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        },
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    initialContact:  {
      __typename: "InitialContact",
      message: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject:  {
    __typename: "Project",
    id: string,
    freelancerID: string,
    freelancer:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    clientID: string,
    client:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        projectID: string,
        content: string,
        creatorID: string,
        creator:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        },
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    initialContact:  {
      __typename: "InitialContact",
      message: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject:  {
    __typename: "Project",
    id: string,
    freelancerID: string,
    freelancer:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    clientID: string,
    client:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        projectID: string,
        content: string,
        creatorID: string,
        creator:  {
          __typename: "User",
          id: string,
          projects:  {
            __typename: "ModelProjectConnection",
            nextToken: string | null,
          } | null,
          name: string | null,
          createdAt: string,
          updatedAt: string,
        },
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    quotes:  {
      __typename: "ModelQuoteConnection",
      items:  Array< {
        __typename: "Quote",
        id: string,
        projectID: string,
        tasks:  {
          __typename: "ModelTaskConnection",
          items:  Array< {
            __typename: "Task",
            id: string,
            quoteID: string,
            text: string,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    initialContact:  {
      __typename: "InitialContact",
      message: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateQuoteSubscription = {
  onCreateQuote:  {
    __typename: "Quote",
    id: string,
    projectID: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuoteSubscription = {
  onUpdateQuote:  {
    __typename: "Quote",
    id: string,
    projectID: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuoteSubscription = {
  onDeleteQuote:  {
    __typename: "Quote",
    id: string,
    projectID: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        quoteID: string,
        text: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment:  {
    __typename: "Comment",
    id: string,
    projectID: string,
    content: string,
    creatorID: string,
    creator:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment:  {
    __typename: "Comment",
    id: string,
    projectID: string,
    content: string,
    creatorID: string,
    creator:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment:  {
    __typename: "Comment",
    id: string,
    projectID: string,
    content: string,
    creatorID: string,
    creator:  {
      __typename: "User",
      id: string,
      projects:  {
        __typename: "ModelProjectConnection",
        items:  Array< {
          __typename: "Project",
          id: string,
          freelancerID: string,
          freelancer:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          clientID: string,
          client:  {
            __typename: "User",
            id: string,
            name: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          comments:  {
            __typename: "ModelCommentConnection",
            nextToken: string | null,
          } | null,
          quotes:  {
            __typename: "ModelQuoteConnection",
            nextToken: string | null,
          } | null,
          initialContact:  {
            __typename: "InitialContact",
            message: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTaskSubscription = {
  onCreateTask:  {
    __typename: "Task",
    id: string,
    quoteID: string,
    text: string,
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
    createdAt: string,
    updatedAt: string,
  } | null,
};
