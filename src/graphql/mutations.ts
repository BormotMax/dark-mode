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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createProjectClient = /* GraphQL */ `
  mutation CreateProjectClient(
    $input: CreateProjectClientInput!
    $condition: ModelProjectClientConditionInput
  ) {
    createProjectClient(input: $input, condition: $condition) {
      id
      clientID
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
export const updateProjectClient = /* GraphQL */ `
  mutation UpdateProjectClient(
    $input: UpdateProjectClientInput!
    $condition: ModelProjectClientConditionInput
  ) {
    updateProjectClient(input: $input, condition: $condition) {
      id
      clientID
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
export const deleteProjectClient = /* GraphQL */ `
  mutation DeleteProjectClient(
    $input: DeleteProjectClientInput!
    $condition: ModelProjectClientConditionInput
  ) {
    deleteProjectClient(input: $input, condition: $condition) {
      id
      clientID
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
export const createProjectFreelancer = /* GraphQL */ `
  mutation CreateProjectFreelancer(
    $input: CreateProjectFreelancerInput!
    $condition: ModelProjectFreelancerConditionInput
  ) {
    createProjectFreelancer(input: $input, condition: $condition) {
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
export const updateProjectFreelancer = /* GraphQL */ `
  mutation UpdateProjectFreelancer(
    $input: UpdateProjectFreelancerInput!
    $condition: ModelProjectFreelancerConditionInput
  ) {
    updateProjectFreelancer(input: $input, condition: $condition) {
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
export const deleteProjectFreelancer = /* GraphQL */ `
  mutation DeleteProjectFreelancer(
    $input: DeleteProjectFreelancerInput!
    $condition: ModelProjectFreelancerConditionInput
  ) {
    deleteProjectFreelancer(input: $input, condition: $condition) {
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
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      createdAt
      owner
      freelancerID
      clientID
      details
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
      client {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
      id
      createdAt
      owner
      freelancerID
      clientID
      details
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
      client {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
      id
      createdAt
      owner
      freelancerID
      clientID
      details
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
      client {
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
export const createQuote = /* GraphQL */ `
  mutation CreateQuote(
    $input: CreateQuoteInput!
    $condition: ModelQuoteConditionInput
  ) {
    createQuote(input: $input, condition: $condition) {
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
export const updateQuote = /* GraphQL */ `
  mutation UpdateQuote(
    $input: UpdateQuoteInput!
    $condition: ModelQuoteConditionInput
  ) {
    updateQuote(input: $input, condition: $condition) {
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
export const deleteQuote = /* GraphQL */ `
  mutation DeleteQuote(
    $input: DeleteQuoteInput!
    $condition: ModelQuoteConditionInput
  ) {
    deleteQuote(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const updateHireMeInfo = /* GraphQL */ `
  mutation UpdateHireMeInfo(
    $input: UpdateHireMeInfoInput!
    $condition: ModelHireMeInfoConditionInput
  ) {
    updateHireMeInfo(input: $input, condition: $condition) {
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
export const deleteHireMeInfo = /* GraphQL */ `
  mutation DeleteHireMeInfo(
    $input: DeleteHireMeInfoInput!
    $condition: ModelHireMeInfoConditionInput
  ) {
    deleteHireMeInfo(input: $input, condition: $condition) {
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
export const createDomainSlug = /* GraphQL */ `
  mutation CreateDomainSlug(
    $input: CreateDomainSlugInput!
    $condition: ModelDomainSlugConditionInput
  ) {
    createDomainSlug(input: $input, condition: $condition) {
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
export const updateDomainSlug = /* GraphQL */ `
  mutation UpdateDomainSlug(
    $input: UpdateDomainSlugInput!
    $condition: ModelDomainSlugConditionInput
  ) {
    updateDomainSlug(input: $input, condition: $condition) {
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
export const deleteDomainSlug = /* GraphQL */ `
  mutation DeleteDomainSlug(
    $input: DeleteDomainSlugInput!
    $condition: ModelDomainSlugConditionInput
  ) {
    deleteDomainSlug(input: $input, condition: $condition) {
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
