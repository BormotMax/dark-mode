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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
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
