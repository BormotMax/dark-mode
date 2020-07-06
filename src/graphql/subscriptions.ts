/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
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
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
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
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
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
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
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
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
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
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
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
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
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
export const onCreateQuote = /* GraphQL */ `
  subscription OnCreateQuote {
    onCreateQuote {
      id
      projectID
      tasks {
        items {
          id
          quoteID
          text
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
export const onUpdateQuote = /* GraphQL */ `
  subscription OnUpdateQuote {
    onUpdateQuote {
      id
      projectID
      tasks {
        items {
          id
          quoteID
          text
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
export const onDeleteQuote = /* GraphQL */ `
  subscription OnDeleteQuote {
    onDeleteQuote {
      id
      projectID
      tasks {
        items {
          id
          quoteID
          text
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
      creator {
        id
        projects {
          items {
            id
            freelancerID
            freelancer {
              id
              name
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
      creator {
        id
        projects {
          items {
            id
            freelancerID
            freelancer {
              id
              name
              createdAt
              updatedAt
            }
            clientID
            client {
              id
              name
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask {
    onCreateTask {
      id
      quoteID
      text
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
      createdAt
      updatedAt
    }
  }
`;
