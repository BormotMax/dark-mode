/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      company
      email
      phone
      signedOutAuthToken
      role
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      company
      email
      phone
      signedOutAuthToken
      role
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      company
      email
      phone
      signedOutAuthToken
      role
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProjectClient = /* GraphQL */ `
  subscription OnCreateProjectClient {
    onCreateProjectClient {
      id
      clientID
      projectID
      title
      isInitialContact
      createdAt
      updatedAt
      user {
        id
        name
        company
        email
        phone
        signedOutAuthToken
        role
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateProjectClient = /* GraphQL */ `
  subscription OnUpdateProjectClient {
    onUpdateProjectClient {
      id
      clientID
      projectID
      title
      isInitialContact
      createdAt
      updatedAt
      user {
        id
        name
        company
        email
        phone
        signedOutAuthToken
        role
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteProjectClient = /* GraphQL */ `
  subscription OnDeleteProjectClient {
    onDeleteProjectClient {
      id
      clientID
      projectID
      title
      isInitialContact
      createdAt
      updatedAt
      user {
        id
        name
        company
        email
        phone
        signedOutAuthToken
        role
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateProjectFreelancer = /* GraphQL */ `
  subscription OnCreateProjectFreelancer {
    onCreateProjectFreelancer {
      id
      freelancerID
      projectID
      title
      createdAt
      updatedAt
      user {
        id
        name
        company
        email
        phone
        signedOutAuthToken
        role
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateProjectFreelancer = /* GraphQL */ `
  subscription OnUpdateProjectFreelancer {
    onUpdateProjectFreelancer {
      id
      freelancerID
      projectID
      title
      createdAt
      updatedAt
      user {
        id
        name
        company
        email
        phone
        signedOutAuthToken
        role
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteProjectFreelancer = /* GraphQL */ `
  subscription OnDeleteProjectFreelancer {
    onDeleteProjectFreelancer {
      id
      freelancerID
      projectID
      title
      createdAt
      updatedAt
      user {
        id
        name
        company
        email
        phone
        signedOutAuthToken
        role
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
      id
      createdAt
      owner
      freelancerID
      details
      title
      company
      updatedAt
      freelancer {
        id
        name
        company
        email
        phone
        signedOutAuthToken
        role
        createdAt
        updatedAt
      }
      clients {
        items {
          id
          clientID
          projectID
          title
          isInitialContact
          createdAt
          updatedAt
          user {
            id
            name
            company
            email
            phone
            signedOutAuthToken
            role
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      freelancers {
        items {
          id
          freelancerID
          projectID
          title
          createdAt
          updatedAt
          user {
            id
            name
            company
            email
            phone
            signedOutAuthToken
            role
            createdAt
            updatedAt
          }
        }
        nextToken
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
          createdAt
          projectID
          content
          creatorID
          updatedAt
          creator {
            id
            name
            company
            email
            phone
            signedOutAuthToken
            role
            createdAt
            updatedAt
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
      createdAt
      owner
      freelancerID
      details
      title
      company
      updatedAt
      freelancer {
        id
        name
        company
        email
        phone
        signedOutAuthToken
        role
        createdAt
        updatedAt
      }
      clients {
        items {
          id
          clientID
          projectID
          title
          isInitialContact
          createdAt
          updatedAt
          user {
            id
            name
            company
            email
            phone
            signedOutAuthToken
            role
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      freelancers {
        items {
          id
          freelancerID
          projectID
          title
          createdAt
          updatedAt
          user {
            id
            name
            company
            email
            phone
            signedOutAuthToken
            role
            createdAt
            updatedAt
          }
        }
        nextToken
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
          createdAt
          projectID
          content
          creatorID
          updatedAt
          creator {
            id
            name
            company
            email
            phone
            signedOutAuthToken
            role
            createdAt
            updatedAt
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
      createdAt
      owner
      freelancerID
      details
      title
      company
      updatedAt
      freelancer {
        id
        name
        company
        email
        phone
        signedOutAuthToken
        role
        createdAt
        updatedAt
      }
      clients {
        items {
          id
          clientID
          projectID
          title
          isInitialContact
          createdAt
          updatedAt
          user {
            id
            name
            company
            email
            phone
            signedOutAuthToken
            role
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      freelancers {
        items {
          id
          freelancerID
          projectID
          title
          createdAt
          updatedAt
          user {
            id
            name
            company
            email
            phone
            signedOutAuthToken
            role
            createdAt
            updatedAt
          }
        }
        nextToken
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
          createdAt
          projectID
          content
          creatorID
          updatedAt
          creator {
            id
            name
            company
            email
            phone
            signedOutAuthToken
            role
            createdAt
            updatedAt
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
      createdAt
      projectID
      content
      creatorID
      updatedAt
      creator {
        id
        name
        company
        email
        phone
        signedOutAuthToken
        role
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      createdAt
      projectID
      content
      creatorID
      updatedAt
      creator {
        id
        name
        company
        email
        phone
        signedOutAuthToken
        role
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      createdAt
      projectID
      content
      creatorID
      updatedAt
      creator {
        id
        name
        company
        email
        phone
        signedOutAuthToken
        role
        createdAt
        updatedAt
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
      dribbbleUrl
      instagramUrl
      linkedInUrl
      domainSlugID
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
      domainSlug {
        slug
        freelancerID
        createdAt
        updatedAt
        hireMeInfo {
          freelancerID
          name
          title
          email
          buttonText
          blurbText
          aboutText
          twitterUrl
          dribbbleUrl
          instagramUrl
          linkedInUrl
          domainSlugID
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
          domainSlug {
            slug
            freelancerID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
              name
              title
              email
              buttonText
              blurbText
              aboutText
              twitterUrl
              dribbbleUrl
              instagramUrl
              linkedInUrl
              domainSlugID
              createdAt
              updatedAt
            }
          }
        }
      }
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
      dribbbleUrl
      instagramUrl
      linkedInUrl
      domainSlugID
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
      domainSlug {
        slug
        freelancerID
        createdAt
        updatedAt
        hireMeInfo {
          freelancerID
          name
          title
          email
          buttonText
          blurbText
          aboutText
          twitterUrl
          dribbbleUrl
          instagramUrl
          linkedInUrl
          domainSlugID
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
          domainSlug {
            slug
            freelancerID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
              name
              title
              email
              buttonText
              blurbText
              aboutText
              twitterUrl
              dribbbleUrl
              instagramUrl
              linkedInUrl
              domainSlugID
              createdAt
              updatedAt
            }
          }
        }
      }
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
      dribbbleUrl
      instagramUrl
      linkedInUrl
      domainSlugID
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
      domainSlug {
        slug
        freelancerID
        createdAt
        updatedAt
        hireMeInfo {
          freelancerID
          name
          title
          email
          buttonText
          blurbText
          aboutText
          twitterUrl
          dribbbleUrl
          instagramUrl
          linkedInUrl
          domainSlugID
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
          domainSlug {
            slug
            freelancerID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
              name
              title
              email
              buttonText
              blurbText
              aboutText
              twitterUrl
              dribbbleUrl
              instagramUrl
              linkedInUrl
              domainSlugID
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
export const onCreateDomainSlug = /* GraphQL */ `
  subscription OnCreateDomainSlug {
    onCreateDomainSlug {
      slug
      freelancerID
      createdAt
      updatedAt
      hireMeInfo {
        freelancerID
        name
        title
        email
        buttonText
        blurbText
        aboutText
        twitterUrl
        dribbbleUrl
        instagramUrl
        linkedInUrl
        domainSlugID
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
        domainSlug {
          slug
          freelancerID
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
            name
            title
            email
            buttonText
            blurbText
            aboutText
            twitterUrl
            dribbbleUrl
            instagramUrl
            linkedInUrl
            domainSlugID
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
            domainSlug {
              slug
              freelancerID
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
export const onUpdateDomainSlug = /* GraphQL */ `
  subscription OnUpdateDomainSlug {
    onUpdateDomainSlug {
      slug
      freelancerID
      createdAt
      updatedAt
      hireMeInfo {
        freelancerID
        name
        title
        email
        buttonText
        blurbText
        aboutText
        twitterUrl
        dribbbleUrl
        instagramUrl
        linkedInUrl
        domainSlugID
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
        domainSlug {
          slug
          freelancerID
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
            name
            title
            email
            buttonText
            blurbText
            aboutText
            twitterUrl
            dribbbleUrl
            instagramUrl
            linkedInUrl
            domainSlugID
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
            domainSlug {
              slug
              freelancerID
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
export const onDeleteDomainSlug = /* GraphQL */ `
  subscription OnDeleteDomainSlug {
    onDeleteDomainSlug {
      slug
      freelancerID
      createdAt
      updatedAt
      hireMeInfo {
        freelancerID
        name
        title
        email
        buttonText
        blurbText
        aboutText
        twitterUrl
        dribbbleUrl
        instagramUrl
        linkedInUrl
        domainSlugID
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
        domainSlug {
          slug
          freelancerID
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
            name
            title
            email
            buttonText
            blurbText
            aboutText
            twitterUrl
            dribbbleUrl
            instagramUrl
            linkedInUrl
            domainSlugID
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
            domainSlug {
              slug
              freelancerID
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
