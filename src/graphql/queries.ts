/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        freelancerID
        freelancer {
          id
          projects {
            items {
              id
              freelancerID
              clientID
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
              clientID
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
              name
              role
              avatarUrl
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
      nextToken
    }
  }
`;
export const getQuote = /* GraphQL */ `
  query GetQuote($id: ID!) {
    getQuote(id: $id) {
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
export const listQuotes = /* GraphQL */ `
  query ListQuotes(
    $filter: ModelQuoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
              clientID
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
      nextToken
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      quoteID
      text
      completed
      createdAt
      updatedAt
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
export const getHireMeInfo = /* GraphQL */ `
  query GetHireMeInfo($freelancerID: ID!) {
    getHireMeInfo(freelancerID: $freelancerID) {
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
export const listHireMeInfos = /* GraphQL */ `
  query ListHireMeInfos(
    $freelancerID: ID
    $filter: ModelHireMeInfoFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listHireMeInfos(
      freelancerID: $freelancerID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const projectsByFreelancer = /* GraphQL */ `
  query ProjectsByFreelancer(
    $freelancerID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    projectsByFreelancer(
      freelancerID: $freelancerID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        freelancerID
        freelancer {
          id
          projects {
            items {
              id
              freelancerID
              clientID
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
              clientID
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
              name
              role
              avatarUrl
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
      nextToken
    }
  }
`;
