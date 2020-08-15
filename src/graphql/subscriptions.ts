/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      role
      createdAt
      updatedAt
      projects {
        items {
          id
          freelancerID
          clientID
          initialContact {
            message
          }
          createdAt
          updatedAt
          freelancer {
            id
            name
            role
            createdAt
            updatedAt
            projects {
              nextToken
            }
          }
          client {
            id
            name
            role
            createdAt
            updatedAt
            projects {
              nextToken
            }
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
        }
        nextToken
      }
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      role
      createdAt
      updatedAt
      projects {
        items {
          id
          freelancerID
          clientID
          initialContact {
            message
          }
          createdAt
          updatedAt
          freelancer {
            id
            name
            role
            createdAt
            updatedAt
            projects {
              nextToken
            }
          }
          client {
            id
            name
            role
            createdAt
            updatedAt
            projects {
              nextToken
            }
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
        }
        nextToken
      }
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      role
      createdAt
      updatedAt
      projects {
        items {
          id
          freelancerID
          clientID
          initialContact {
            message
          }
          createdAt
          updatedAt
          freelancer {
            id
            name
            role
            createdAt
            updatedAt
            projects {
              nextToken
            }
          }
          client {
            id
            name
            role
            createdAt
            updatedAt
            projects {
              nextToken
            }
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
        }
        nextToken
      }
    }
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
      id
      freelancerID
      clientID
      initialContact {
        message
      }
      createdAt
      updatedAt
      freelancer {
        id
        name
        role
        createdAt
        updatedAt
        projects {
          items {
            id
            freelancerID
            clientID
            initialContact {
              message
            }
            createdAt
            updatedAt
            freelancer {
              id
              name
              role
              createdAt
              updatedAt
            }
            client {
              id
              name
              role
              createdAt
              updatedAt
            }
            quotes {
              nextToken
            }
            comments {
              nextToken
            }
          }
          nextToken
        }
      }
      client {
        id
        name
        role
        createdAt
        updatedAt
        projects {
          items {
            id
            freelancerID
            clientID
            initialContact {
              message
            }
            createdAt
            updatedAt
            freelancer {
              id
              name
              role
              createdAt
              updatedAt
            }
            client {
              id
              name
              role
              createdAt
              updatedAt
            }
            quotes {
              nextToken
            }
            comments {
              nextToken
            }
          }
          nextToken
        }
      }
      quotes {
        items {
          id
          projectID
          createdAt
          updatedAt
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
        }
        nextToken
      }
      comments {
        items {
          id
          projectID
          content
          creatorID
          createdAt
          updatedAt
          creator {
            id
            name
            role
            createdAt
            updatedAt
            projects {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
      id
      freelancerID
      clientID
      initialContact {
        message
      }
      createdAt
      updatedAt
      freelancer {
        id
        name
        role
        createdAt
        updatedAt
        projects {
          items {
            id
            freelancerID
            clientID
            initialContact {
              message
            }
            createdAt
            updatedAt
            freelancer {
              id
              name
              role
              createdAt
              updatedAt
            }
            client {
              id
              name
              role
              createdAt
              updatedAt
            }
            quotes {
              nextToken
            }
            comments {
              nextToken
            }
          }
          nextToken
        }
      }
      client {
        id
        name
        role
        createdAt
        updatedAt
        projects {
          items {
            id
            freelancerID
            clientID
            initialContact {
              message
            }
            createdAt
            updatedAt
            freelancer {
              id
              name
              role
              createdAt
              updatedAt
            }
            client {
              id
              name
              role
              createdAt
              updatedAt
            }
            quotes {
              nextToken
            }
            comments {
              nextToken
            }
          }
          nextToken
        }
      }
      quotes {
        items {
          id
          projectID
          createdAt
          updatedAt
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
        }
        nextToken
      }
      comments {
        items {
          id
          projectID
          content
          creatorID
          createdAt
          updatedAt
          creator {
            id
            name
            role
            createdAt
            updatedAt
            projects {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
      id
      freelancerID
      clientID
      initialContact {
        message
      }
      createdAt
      updatedAt
      freelancer {
        id
        name
        role
        createdAt
        updatedAt
        projects {
          items {
            id
            freelancerID
            clientID
            initialContact {
              message
            }
            createdAt
            updatedAt
            freelancer {
              id
              name
              role
              createdAt
              updatedAt
            }
            client {
              id
              name
              role
              createdAt
              updatedAt
            }
            quotes {
              nextToken
            }
            comments {
              nextToken
            }
          }
          nextToken
        }
      }
      client {
        id
        name
        role
        createdAt
        updatedAt
        projects {
          items {
            id
            freelancerID
            clientID
            initialContact {
              message
            }
            createdAt
            updatedAt
            freelancer {
              id
              name
              role
              createdAt
              updatedAt
            }
            client {
              id
              name
              role
              createdAt
              updatedAt
            }
            quotes {
              nextToken
            }
            comments {
              nextToken
            }
          }
          nextToken
        }
      }
      quotes {
        items {
          id
          projectID
          createdAt
          updatedAt
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
        }
        nextToken
      }
      comments {
        items {
          id
          projectID
          content
          creatorID
          createdAt
          updatedAt
          creator {
            id
            name
            role
            createdAt
            updatedAt
            projects {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const onCreateQuote = /* GraphQL */ `
  subscription OnCreateQuote {
    onCreateQuote {
      id
      projectID
      createdAt
      updatedAt
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
    }
  }
`;
export const onUpdateQuote = /* GraphQL */ `
  subscription OnUpdateQuote {
    onUpdateQuote {
      id
      projectID
      createdAt
      updatedAt
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
    }
  }
`;
export const onDeleteQuote = /* GraphQL */ `
  subscription OnDeleteQuote {
    onDeleteQuote {
      id
      projectID
      createdAt
      updatedAt
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
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      projectID
      content
      creatorID
      createdAt
      updatedAt
      creator {
        id
        name
        role
        createdAt
        updatedAt
        projects {
          items {
            id
            freelancerID
            clientID
            initialContact {
              message
            }
            createdAt
            updatedAt
            freelancer {
              id
              name
              role
              createdAt
              updatedAt
            }
            client {
              id
              name
              role
              createdAt
              updatedAt
            }
            quotes {
              nextToken
            }
            comments {
              nextToken
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      projectID
      content
      creatorID
      createdAt
      updatedAt
      creator {
        id
        name
        role
        createdAt
        updatedAt
        projects {
          items {
            id
            freelancerID
            clientID
            initialContact {
              message
            }
            createdAt
            updatedAt
            freelancer {
              id
              name
              role
              createdAt
              updatedAt
            }
            client {
              id
              name
              role
              createdAt
              updatedAt
            }
            quotes {
              nextToken
            }
            comments {
              nextToken
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      projectID
      content
      creatorID
      createdAt
      updatedAt
      creator {
        id
        name
        role
        createdAt
        updatedAt
        projects {
          items {
            id
            freelancerID
            clientID
            initialContact {
              message
            }
            createdAt
            updatedAt
            freelancer {
              id
              name
              role
              createdAt
              updatedAt
            }
            client {
              id
              name
              role
              createdAt
              updatedAt
            }
            quotes {
              nextToken
            }
            comments {
              nextToken
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask {
    onCreateTask {
      id
      quoteID
      text
      completed
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask {
    onUpdateTask {
      id
      quoteID
      text
      completed
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask {
    onDeleteTask {
      id
      quoteID
      text
      completed
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHireMeInfo = /* GraphQL */ `
  subscription OnCreateHireMeInfo {
    onCreateHireMeInfo {
      freelancerID
      name
      title
      email
      buttonText
      blurbText
      aboutText
      twitterUrl
      instagramUrl
      linkedInUrl
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
export const onUpdateHireMeInfo = /* GraphQL */ `
  subscription OnUpdateHireMeInfo {
    onUpdateHireMeInfo {
      freelancerID
      name
      title
      email
      buttonText
      blurbText
      aboutText
      twitterUrl
      instagramUrl
      linkedInUrl
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
export const onDeleteHireMeInfo = /* GraphQL */ `
  subscription OnDeleteHireMeInfo {
    onDeleteHireMeInfo {
      freelancerID
      name
      title
      email
      buttonText
      blurbText
      aboutText
      twitterUrl
      instagramUrl
      linkedInUrl
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
