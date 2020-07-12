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
            role
            avatarUrl
            avatar {
              key
            }
            hireMeInfo {
              id
              freelancerID
              name
              title
              buttonText
              blurbText
              aboutText
              createdAt
              updatedAt
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
            }
            hireMeInfo {
              id
              freelancerID
              name
              title
              buttonText
              blurbText
              aboutText
              createdAt
              updatedAt
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
      }
      hireMeInfo {
        id
        freelancerID
        name
        title
        buttonText
        blurbText
        aboutText
        bannerImage {
          key
        }
        portfolioImages {
          key
        }
        createdAt
        updatedAt
      }
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
            role
            avatarUrl
            avatar {
              key
            }
            hireMeInfo {
              id
              freelancerID
              name
              title
              buttonText
              blurbText
              aboutText
              createdAt
              updatedAt
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
            }
            hireMeInfo {
              id
              freelancerID
              name
              title
              buttonText
              blurbText
              aboutText
              createdAt
              updatedAt
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
      }
      hireMeInfo {
        id
        freelancerID
        name
        title
        buttonText
        blurbText
        aboutText
        bannerImage {
          key
        }
        portfolioImages {
          key
        }
        createdAt
        updatedAt
      }
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
            role
            avatarUrl
            avatar {
              key
            }
            hireMeInfo {
              id
              freelancerID
              name
              title
              buttonText
              blurbText
              aboutText
              createdAt
              updatedAt
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
            }
            hireMeInfo {
              id
              freelancerID
              name
              title
              buttonText
              blurbText
              aboutText
              createdAt
              updatedAt
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
      }
      hireMeInfo {
        id
        freelancerID
        name
        title
        buttonText
        blurbText
        aboutText
        bannerImage {
          key
        }
        portfolioImages {
          key
        }
        createdAt
        updatedAt
      }
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
        }
        hireMeInfo {
          id
          freelancerID
          name
          title
          buttonText
          blurbText
          aboutText
          bannerImage {
            key
          }
          portfolioImages {
            key
          }
          createdAt
          updatedAt
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
        }
        hireMeInfo {
          id
          freelancerID
          name
          title
          buttonText
          blurbText
          aboutText
          bannerImage {
            key
          }
          portfolioImages {
            key
          }
          createdAt
          updatedAt
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
            }
            hireMeInfo {
              id
              freelancerID
              name
              title
              buttonText
              blurbText
              aboutText
              createdAt
              updatedAt
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
        }
        hireMeInfo {
          id
          freelancerID
          name
          title
          buttonText
          blurbText
          aboutText
          bannerImage {
            key
          }
          portfolioImages {
            key
          }
          createdAt
          updatedAt
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
        }
        hireMeInfo {
          id
          freelancerID
          name
          title
          buttonText
          blurbText
          aboutText
          bannerImage {
            key
          }
          portfolioImages {
            key
          }
          createdAt
          updatedAt
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
            }
            hireMeInfo {
              id
              freelancerID
              name
              title
              buttonText
              blurbText
              aboutText
              createdAt
              updatedAt
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
        }
        hireMeInfo {
          id
          freelancerID
          name
          title
          buttonText
          blurbText
          aboutText
          bannerImage {
            key
          }
          portfolioImages {
            key
          }
          createdAt
          updatedAt
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
        }
        hireMeInfo {
          id
          freelancerID
          name
          title
          buttonText
          blurbText
          aboutText
          bannerImage {
            key
          }
          portfolioImages {
            key
          }
          createdAt
          updatedAt
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
            }
            hireMeInfo {
              id
              freelancerID
              name
              title
              buttonText
              blurbText
              aboutText
              createdAt
              updatedAt
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
        }
        hireMeInfo {
          id
          freelancerID
          name
          title
          buttonText
          blurbText
          aboutText
          bannerImage {
            key
          }
          portfolioImages {
            key
          }
          createdAt
          updatedAt
        }
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
        }
        hireMeInfo {
          id
          freelancerID
          name
          title
          buttonText
          blurbText
          aboutText
          bannerImage {
            key
          }
          portfolioImages {
            key
          }
          createdAt
          updatedAt
        }
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
        }
        hireMeInfo {
          id
          freelancerID
          name
          title
          buttonText
          blurbText
          aboutText
          bannerImage {
            key
          }
          portfolioImages {
            key
          }
          createdAt
          updatedAt
        }
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
      id
      freelancerID
      name
      title
      buttonText
      blurbText
      aboutText
      bannerImage {
        key
      }
      portfolioImages {
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHireMeInfo = /* GraphQL */ `
  subscription OnUpdateHireMeInfo {
    onUpdateHireMeInfo {
      id
      freelancerID
      name
      title
      buttonText
      blurbText
      aboutText
      bannerImage {
        key
      }
      portfolioImages {
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHireMeInfo = /* GraphQL */ `
  subscription OnDeleteHireMeInfo {
    onDeleteHireMeInfo {
      id
      freelancerID
      name
      title
      buttonText
      blurbText
      aboutText
      bannerImage {
        key
      }
      portfolioImages {
        key
      }
      createdAt
      updatedAt
    }
  }
`;
