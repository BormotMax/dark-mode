/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      projects {
        items {
          id
          freelancerID
          freelancer {
            id
            projects {
              nextToken
            }
            name
            role
            avatarUrl
            avatar {
              key
              tag
            }
            createdAt
            updatedAt
          }
          clientID
          client {
            id
            projects {
              nextToken
            }
            name
            role
            avatarUrl
            avatar {
              key
              tag
            }
            createdAt
            updatedAt
          }
          comments {
            items {
              id
              projectID
              content
              creatorID
              createdAt
              updatedAt
            }
            nextToken
          }
          quotes {
            items {
              id
              projectID
              createdAt
              updatedAt
            }
            nextToken
          }
          initialContact {
            message
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      name
      role
      avatarUrl
      avatar {
        key
        tag
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      projects {
        items {
          id
          freelancerID
          freelancer {
            id
            projects {
              nextToken
            }
            name
            role
            avatarUrl
            avatar {
              key
              tag
            }
            createdAt
            updatedAt
          }
          clientID
          client {
            id
            projects {
              nextToken
            }
            name
            role
            avatarUrl
            avatar {
              key
              tag
            }
            createdAt
            updatedAt
          }
          comments {
            items {
              id
              projectID
              content
              creatorID
              createdAt
              updatedAt
            }
            nextToken
          }
          quotes {
            items {
              id
              projectID
              createdAt
              updatedAt
            }
            nextToken
          }
          initialContact {
            message
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      name
      role
      avatarUrl
      avatar {
        key
        tag
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      projects {
        items {
          id
          freelancerID
          freelancer {
            id
            projects {
              nextToken
            }
            name
            role
            avatarUrl
            avatar {
              key
              tag
            }
            createdAt
            updatedAt
          }
          clientID
          client {
            id
            projects {
              nextToken
            }
            name
            role
            avatarUrl
            avatar {
              key
              tag
            }
            createdAt
            updatedAt
          }
          comments {
            items {
              id
              projectID
              content
              creatorID
              createdAt
              updatedAt
            }
            nextToken
          }
          quotes {
            items {
              id
              projectID
              createdAt
              updatedAt
            }
            nextToken
          }
          initialContact {
            message
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      name
      role
      avatarUrl
      avatar {
        key
        tag
      }
      createdAt
      updatedAt
    }
  }
`;
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      freelancerID
      freelancer {
        id
        projects {
          items {
            id
            freelancerID
            freelancer {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            comments {
              nextToken
            }
            quotes {
              nextToken
            }
            initialContact {
              message
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        name
        role
        avatarUrl
        avatar {
          key
          tag
        }
        createdAt
        updatedAt
      }
      clientID
      client {
        id
        projects {
          items {
            id
            freelancerID
            freelancer {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            comments {
              nextToken
            }
            quotes {
              nextToken
            }
            initialContact {
              message
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        name
        role
        avatarUrl
        avatar {
          key
          tag
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          projectID
          content
          creatorID
          creator {
            id
            projects {
              nextToken
            }
            name
            role
            avatarUrl
            avatar {
              key
              tag
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      quotes {
        items {
          id
          projectID
          tasks {
            items {
              id
              quoteID
              text
              completed
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      initialContact {
        message
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
      id
      freelancerID
      freelancer {
        id
        projects {
          items {
            id
            freelancerID
            freelancer {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            comments {
              nextToken
            }
            quotes {
              nextToken
            }
            initialContact {
              message
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        name
        role
        avatarUrl
        avatar {
          key
          tag
        }
        createdAt
        updatedAt
      }
      clientID
      client {
        id
        projects {
          items {
            id
            freelancerID
            freelancer {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            comments {
              nextToken
            }
            quotes {
              nextToken
            }
            initialContact {
              message
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        name
        role
        avatarUrl
        avatar {
          key
          tag
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          projectID
          content
          creatorID
          creator {
            id
            projects {
              nextToken
            }
            name
            role
            avatarUrl
            avatar {
              key
              tag
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      quotes {
        items {
          id
          projectID
          tasks {
            items {
              id
              quoteID
              text
              completed
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      initialContact {
        message
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
      id
      freelancerID
      freelancer {
        id
        projects {
          items {
            id
            freelancerID
            freelancer {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            comments {
              nextToken
            }
            quotes {
              nextToken
            }
            initialContact {
              message
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        name
        role
        avatarUrl
        avatar {
          key
          tag
        }
        createdAt
        updatedAt
      }
      clientID
      client {
        id
        projects {
          items {
            id
            freelancerID
            freelancer {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            comments {
              nextToken
            }
            quotes {
              nextToken
            }
            initialContact {
              message
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        name
        role
        avatarUrl
        avatar {
          key
          tag
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          projectID
          content
          creatorID
          creator {
            id
            projects {
              nextToken
            }
            name
            role
            avatarUrl
            avatar {
              key
              tag
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      quotes {
        items {
          id
          projectID
          tasks {
            items {
              id
              quoteID
              text
              completed
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      initialContact {
        message
      }
      createdAt
      updatedAt
    }
  }
`;
export const createQuote = /* GraphQL */ `
  mutation CreateQuote(
    $input: CreateQuoteInput!
    $condition: ModelQuoteConditionInput
  ) {
    createQuote(input: $input, condition: $condition) {
      id
      projectID
      tasks {
        items {
          id
          quoteID
          text
          completed
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateQuote = /* GraphQL */ `
  mutation UpdateQuote(
    $input: UpdateQuoteInput!
    $condition: ModelQuoteConditionInput
  ) {
    updateQuote(input: $input, condition: $condition) {
      id
      projectID
      tasks {
        items {
          id
          quoteID
          text
          completed
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteQuote = /* GraphQL */ `
  mutation DeleteQuote(
    $input: DeleteQuoteInput!
    $condition: ModelQuoteConditionInput
  ) {
    deleteQuote(input: $input, condition: $condition) {
      id
      projectID
      tasks {
        items {
          id
          quoteID
          text
          completed
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      projectID
      content
      creatorID
      creator {
        id
        projects {
          items {
            id
            freelancerID
            freelancer {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            comments {
              nextToken
            }
            quotes {
              nextToken
            }
            initialContact {
              message
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        name
        role
        avatarUrl
        avatar {
          key
          tag
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      projectID
      content
      creatorID
      creator {
        id
        projects {
          items {
            id
            freelancerID
            freelancer {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            comments {
              nextToken
            }
            quotes {
              nextToken
            }
            initialContact {
              message
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        name
        role
        avatarUrl
        avatar {
          key
          tag
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      projectID
      content
      creatorID
      creator {
        id
        projects {
          items {
            id
            freelancerID
            freelancer {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
              role
              avatarUrl
              createdAt
              updatedAt
            }
            comments {
              nextToken
            }
            quotes {
              nextToken
            }
            initialContact {
              message
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        name
        role
        avatarUrl
        avatar {
          key
          tag
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      quoteID
      text
      completed
      createdAt
      updatedAt
    }
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      quoteID
      text
      completed
      createdAt
      updatedAt
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      quoteID
      text
      completed
      createdAt
      updatedAt
    }
  }
`;
export const createHireMeInfo = /* GraphQL */ `
  mutation CreateHireMeInfo(
    $input: CreateHireMeInfoInput!
    $condition: ModelHireMeInfoConditionInput
  ) {
    createHireMeInfo(input: $input, condition: $condition) {
      freelancerID
      name
      title
      buttonText
      blurbText
      aboutText
      bannerImage {
        key
        tag
      }
      portfolioImages {
        key
        tag
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateHireMeInfo = /* GraphQL */ `
  mutation UpdateHireMeInfo(
    $input: UpdateHireMeInfoInput!
    $condition: ModelHireMeInfoConditionInput
  ) {
    updateHireMeInfo(input: $input, condition: $condition) {
      freelancerID
      name
      title
      buttonText
      blurbText
      aboutText
      bannerImage {
        key
        tag
      }
      portfolioImages {
        key
        tag
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteHireMeInfo = /* GraphQL */ `
  mutation DeleteHireMeInfo(
    $input: DeleteHireMeInfoInput!
    $condition: ModelHireMeInfoConditionInput
  ) {
    deleteHireMeInfo(input: $input, condition: $condition) {
      freelancerID
      name
      title
      buttonText
      blurbText
      aboutText
      bannerImage {
        key
        tag
      }
      portfolioImages {
        key
        tag
      }
      createdAt
      updatedAt
    }
  }
`;
