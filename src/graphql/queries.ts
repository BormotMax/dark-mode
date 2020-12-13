/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        title
        company
        email
        avatar {
          key
          tag
        }
        phone
        address
        taxID
        signedOutAuthToken
        role
        stripeAccountID
        createdAt
        updatedAt
        hireMeInfo {
          freelancerID
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
          freelancer {
            id
            name
            title
            company
            email
            avatar {
              key
              tag
            }
            phone
            address
            taxID
            signedOutAuthToken
            role
            stripeAccountID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
          domainSlug {
            slug
            freelancerID
            pendingEmail
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
        }
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      title
      company
      email
      avatar {
        key
        tag
      }
      phone
      address
      taxID
      signedOutAuthToken
      role
      stripeAccountID
      createdAt
      updatedAt
      hireMeInfo {
        freelancerID
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
        freelancer {
          id
          name
          title
          company
          email
          avatar {
            key
            tag
          }
          phone
          address
          taxID
          signedOutAuthToken
          role
          stripeAccountID
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
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
            freelancer {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            domainSlug {
              slug
              freelancerID
              pendingEmail
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
        domainSlug {
          slug
          freelancerID
          pendingEmail
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
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
            freelancer {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            domainSlug {
              slug
              freelancerID
              pendingEmail
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
  }
`;
export const usersByEmail = /* GraphQL */ `
  query UsersByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        title
        company
        email
        avatar {
          key
          tag
        }
        phone
        address
        taxID
        signedOutAuthToken
        role
        stripeAccountID
        createdAt
        updatedAt
        hireMeInfo {
          freelancerID
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
          freelancer {
            id
            name
            title
            company
            email
            avatar {
              key
              tag
            }
            phone
            address
            taxID
            signedOutAuthToken
            role
            stripeAccountID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
          domainSlug {
            slug
            freelancerID
            pendingEmail
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
        }
      }
      nextToken
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: SearchableUserSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        name
        title
        company
        email
        avatar {
          key
          tag
        }
        phone
        address
        taxID
        signedOutAuthToken
        role
        stripeAccountID
        createdAt
        updatedAt
        hireMeInfo {
          freelancerID
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
          freelancer {
            id
            name
            title
            company
            email
            avatar {
              key
              tag
            }
            phone
            address
            taxID
            signedOutAuthToken
            role
            stripeAccountID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
          domainSlug {
            slug
            freelancerID
            pendingEmail
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
        }
      }
      nextToken
      total
    }
  }
`;
export const getProjectClient = /* GraphQL */ `
  query GetProjectClient($id: ID!) {
    getProjectClient(id: $id) {
      id
      clientID
      projectID
      isInitialContact
      createdAt
      updatedAt
      user {
        id
        name
        title
        company
        email
        avatar {
          key
          tag
        }
        phone
        address
        taxID
        signedOutAuthToken
        role
        stripeAccountID
        createdAt
        updatedAt
        hireMeInfo {
          freelancerID
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
          freelancer {
            id
            name
            title
            company
            email
            avatar {
              key
              tag
            }
            phone
            address
            taxID
            signedOutAuthToken
            role
            stripeAccountID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
          domainSlug {
            slug
            freelancerID
            pendingEmail
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
        }
      }
    }
  }
`;
export const listProjectClients = /* GraphQL */ `
  query ListProjectClients(
    $filter: ModelProjectClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjectClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clientID
        projectID
        isInitialContact
        createdAt
        updatedAt
        user {
          id
          name
          title
          company
          email
          avatar {
            key
            tag
          }
          phone
          address
          taxID
          signedOutAuthToken
          role
          stripeAccountID
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
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
            freelancer {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            domainSlug {
              slug
              freelancerID
              pendingEmail
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
      nextToken
    }
  }
`;
export const getProjectFreelancer = /* GraphQL */ `
  query GetProjectFreelancer($id: ID!) {
    getProjectFreelancer(id: $id) {
      id
      createdAt
      freelancerID
      pendingEmail
      projectID
      isInitialContact
      updatedAt
      user {
        id
        name
        title
        company
        email
        avatar {
          key
          tag
        }
        phone
        address
        taxID
        signedOutAuthToken
        role
        stripeAccountID
        createdAt
        updatedAt
        hireMeInfo {
          freelancerID
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
          freelancer {
            id
            name
            title
            company
            email
            avatar {
              key
              tag
            }
            phone
            address
            taxID
            signedOutAuthToken
            role
            stripeAccountID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
          domainSlug {
            slug
            freelancerID
            pendingEmail
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
        }
      }
      project {
        id
        createdAt
        owner
        details
        title
        company
        updatedAt
        clients {
          items {
            id
            clientID
            projectID
            isInitialContact
            createdAt
            updatedAt
            user {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
          nextToken
        }
        freelancers {
          items {
            id
            createdAt
            freelancerID
            pendingEmail
            projectID
            isInitialContact
            updatedAt
            user {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            project {
              id
              createdAt
              owner
              details
              title
              company
              updatedAt
              clients {
                nextToken
              }
              freelancers {
                nextToken
              }
              assets {
                nextToken
              }
              quotes {
                nextToken
              }
              comments {
                nextToken
              }
            }
            notes {
              items {
                id
                projectFreelancerID
                title
                content
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          nextToken
        }
        assets {
          items {
            id
            asset {
              key
              tag
            }
            url
            createdAt
            projectID
            fileName
            updatedAt
          }
          nextToken
        }
        quotes {
          items {
            id
            projectID
            billableHours
            chargePerHour
            totalPrice
            billingType
            status
            statusLastChangedAt
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
            payments {
              items {
                id
                fromUserID
                toUserID
                quoteID
                amount
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
            includedResourceType
            includedResourceID
            updatedAt
            creator {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
          nextToken
        }
      }
      notes {
        items {
          id
          projectFreelancerID
          title
          content
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listProjectFreelancers = /* GraphQL */ `
  query ListProjectFreelancers(
    $filter: ModelProjectFreelancerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjectFreelancers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        freelancerID
        pendingEmail
        projectID
        isInitialContact
        updatedAt
        user {
          id
          name
          title
          company
          email
          avatar {
            key
            tag
          }
          phone
          address
          taxID
          signedOutAuthToken
          role
          stripeAccountID
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
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
            freelancer {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            domainSlug {
              slug
              freelancerID
              pendingEmail
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
        project {
          id
          createdAt
          owner
          details
          title
          company
          updatedAt
          clients {
            items {
              id
              clientID
              projectID
              isInitialContact
              createdAt
              updatedAt
              user {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
            }
            nextToken
          }
          freelancers {
            items {
              id
              createdAt
              freelancerID
              pendingEmail
              projectID
              isInitialContact
              updatedAt
              user {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              project {
                id
                createdAt
                owner
                details
                title
                company
                updatedAt
              }
              notes {
                nextToken
              }
            }
            nextToken
          }
          assets {
            items {
              id
              asset {
                key
                tag
              }
              url
              createdAt
              projectID
              fileName
              updatedAt
            }
            nextToken
          }
          quotes {
            items {
              id
              projectID
              billableHours
              chargePerHour
              totalPrice
              billingType
              status
              statusLastChangedAt
              createdAt
              updatedAt
              tasks {
                nextToken
              }
              payments {
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
              includedResourceType
              includedResourceID
              updatedAt
              creator {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
            }
            nextToken
          }
        }
        notes {
          items {
            id
            projectFreelancerID
            title
            content
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const projectsByFreelancer = /* GraphQL */ `
  query ProjectsByFreelancer(
    $freelancerID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProjectFreelancerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    projectsByFreelancer(
      freelancerID: $freelancerID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        freelancerID
        pendingEmail
        projectID
        isInitialContact
        updatedAt
        user {
          id
          name
          title
          company
          email
          avatar {
            key
            tag
          }
          phone
          address
          taxID
          signedOutAuthToken
          role
          stripeAccountID
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
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
            freelancer {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            domainSlug {
              slug
              freelancerID
              pendingEmail
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
        project {
          id
          createdAt
          owner
          details
          title
          company
          updatedAt
          clients {
            items {
              id
              clientID
              projectID
              isInitialContact
              createdAt
              updatedAt
              user {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
            }
            nextToken
          }
          freelancers {
            items {
              id
              createdAt
              freelancerID
              pendingEmail
              projectID
              isInitialContact
              updatedAt
              user {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              project {
                id
                createdAt
                owner
                details
                title
                company
                updatedAt
              }
              notes {
                nextToken
              }
            }
            nextToken
          }
          assets {
            items {
              id
              asset {
                key
                tag
              }
              url
              createdAt
              projectID
              fileName
              updatedAt
            }
            nextToken
          }
          quotes {
            items {
              id
              projectID
              billableHours
              chargePerHour
              totalPrice
              billingType
              status
              statusLastChangedAt
              createdAt
              updatedAt
              tasks {
                nextToken
              }
              payments {
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
              includedResourceType
              includedResourceID
              updatedAt
              creator {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
            }
            nextToken
          }
        }
        notes {
          items {
            id
            projectFreelancerID
            title
            content
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
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
        createdAt
        owner
        details
        title
        company
        updatedAt
        clients {
          items {
            id
            clientID
            projectID
            isInitialContact
            createdAt
            updatedAt
            user {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
          nextToken
        }
        freelancers {
          items {
            id
            createdAt
            freelancerID
            pendingEmail
            projectID
            isInitialContact
            updatedAt
            user {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            project {
              id
              createdAt
              owner
              details
              title
              company
              updatedAt
              clients {
                nextToken
              }
              freelancers {
                nextToken
              }
              assets {
                nextToken
              }
              quotes {
                nextToken
              }
              comments {
                nextToken
              }
            }
            notes {
              items {
                id
                projectFreelancerID
                title
                content
                createdAt
                updatedAt
              }
              nextToken
            }
          }
          nextToken
        }
        assets {
          items {
            id
            asset {
              key
              tag
            }
            url
            createdAt
            projectID
            fileName
            updatedAt
          }
          nextToken
        }
        quotes {
          items {
            id
            projectID
            billableHours
            chargePerHour
            totalPrice
            billingType
            status
            statusLastChangedAt
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
            payments {
              items {
                id
                fromUserID
                toUserID
                quoteID
                amount
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
            includedResourceType
            includedResourceID
            updatedAt
            creator {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      createdAt
      owner
      details
      title
      company
      updatedAt
      clients {
        items {
          id
          clientID
          projectID
          isInitialContact
          createdAt
          updatedAt
          user {
            id
            name
            title
            company
            email
            avatar {
              key
              tag
            }
            phone
            address
            taxID
            signedOutAuthToken
            role
            stripeAccountID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
        }
        nextToken
      }
      freelancers {
        items {
          id
          createdAt
          freelancerID
          pendingEmail
          projectID
          isInitialContact
          updatedAt
          user {
            id
            name
            title
            company
            email
            avatar {
              key
              tag
            }
            phone
            address
            taxID
            signedOutAuthToken
            role
            stripeAccountID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
          project {
            id
            createdAt
            owner
            details
            title
            company
            updatedAt
            clients {
              items {
                id
                clientID
                projectID
                isInitialContact
                createdAt
                updatedAt
              }
              nextToken
            }
            freelancers {
              items {
                id
                createdAt
                freelancerID
                pendingEmail
                projectID
                isInitialContact
                updatedAt
              }
              nextToken
            }
            assets {
              items {
                id
                url
                createdAt
                projectID
                fileName
                updatedAt
              }
              nextToken
            }
            quotes {
              items {
                id
                projectID
                billableHours
                chargePerHour
                totalPrice
                billingType
                status
                statusLastChangedAt
                createdAt
                updatedAt
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
                includedResourceType
                includedResourceID
                updatedAt
              }
              nextToken
            }
          }
          notes {
            items {
              id
              projectFreelancerID
              title
              content
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        nextToken
      }
      assets {
        items {
          id
          asset {
            key
            tag
          }
          url
          createdAt
          projectID
          fileName
          updatedAt
        }
        nextToken
      }
      quotes {
        items {
          id
          projectID
          billableHours
          chargePerHour
          totalPrice
          billingType
          status
          statusLastChangedAt
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
          payments {
            items {
              id
              fromUserID
              toUserID
              quoteID
              amount
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
          includedResourceType
          includedResourceID
          updatedAt
          creator {
            id
            name
            title
            company
            email
            avatar {
              key
              tag
            }
            phone
            address
            taxID
            signedOutAuthToken
            role
            stripeAccountID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const getProjectAssets = /* GraphQL */ `
  query GetProjectAssets($id: ID!) {
    getProjectAssets(id: $id) {
      id
      asset {
        key
        tag
      }
      url
      createdAt
      projectID
      fileName
      updatedAt
    }
  }
`;
export const listProjectAssetss = /* GraphQL */ `
  query ListProjectAssetss(
    $filter: ModelProjectAssetsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjectAssetss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        asset {
          key
          tag
        }
        url
        createdAt
        projectID
        fileName
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
      billableHours
      chargePerHour
      totalPrice
      billingType
      status
      statusLastChangedAt
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
      payments {
        items {
          id
          fromUserID
          toUserID
          quoteID
          amount
          createdAt
          updatedAt
        }
        nextToken
      }
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
        billableHours
        chargePerHour
        totalPrice
        billingType
        status
        statusLastChangedAt
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
        payments {
          items {
            id
            fromUserID
            toUserID
            quoteID
            amount
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      createdAt
      projectID
      content
      creatorID
      includedResourceType
      includedResourceID
      updatedAt
      creator {
        id
        name
        title
        company
        email
        avatar {
          key
          tag
        }
        phone
        address
        taxID
        signedOutAuthToken
        role
        stripeAccountID
        createdAt
        updatedAt
        hireMeInfo {
          freelancerID
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
          freelancer {
            id
            name
            title
            company
            email
            avatar {
              key
              tag
            }
            phone
            address
            taxID
            signedOutAuthToken
            role
            stripeAccountID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
          domainSlug {
            slug
            freelancerID
            pendingEmail
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
        }
      }
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
        createdAt
        projectID
        content
        creatorID
        includedResourceType
        includedResourceID
        updatedAt
        creator {
          id
          name
          title
          company
          email
          avatar {
            key
            tag
          }
          phone
          address
          taxID
          signedOutAuthToken
          role
          stripeAccountID
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
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
            freelancer {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            domainSlug {
              slug
              freelancerID
              pendingEmail
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
        freelancer {
          id
          name
          title
          company
          email
          avatar {
            key
            tag
          }
          phone
          address
          taxID
          signedOutAuthToken
          role
          stripeAccountID
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
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
            freelancer {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            domainSlug {
              slug
              freelancerID
              pendingEmail
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
        domainSlug {
          slug
          freelancerID
          pendingEmail
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
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
            freelancer {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            domainSlug {
              slug
              freelancerID
              pendingEmail
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
      nextToken
    }
  }
`;
export const getHireMeInfo = /* GraphQL */ `
  query GetHireMeInfo($freelancerID: ID!) {
    getHireMeInfo(freelancerID: $freelancerID) {
      freelancerID
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
      freelancer {
        id
        name
        title
        company
        email
        avatar {
          key
          tag
        }
        phone
        address
        taxID
        signedOutAuthToken
        role
        stripeAccountID
        createdAt
        updatedAt
        hireMeInfo {
          freelancerID
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
          freelancer {
            id
            name
            title
            company
            email
            avatar {
              key
              tag
            }
            phone
            address
            taxID
            signedOutAuthToken
            role
            stripeAccountID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
          domainSlug {
            slug
            freelancerID
            pendingEmail
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
        }
      }
      domainSlug {
        slug
        freelancerID
        pendingEmail
        createdAt
        updatedAt
        hireMeInfo {
          freelancerID
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
          freelancer {
            id
            name
            title
            company
            email
            avatar {
              key
              tag
            }
            phone
            address
            taxID
            signedOutAuthToken
            role
            stripeAccountID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
          domainSlug {
            slug
            freelancerID
            pendingEmail
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
        }
      }
    }
  }
`;
export const hireInfoByDomainSlug = /* GraphQL */ `
  query HireInfoByDomainSlug(
    $domainSlugID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelHireMeInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    hireInfoByDomainSlug(
      domainSlugID: $domainSlugID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        freelancerID
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
        freelancer {
          id
          name
          title
          company
          email
          avatar {
            key
            tag
          }
          phone
          address
          taxID
          signedOutAuthToken
          role
          stripeAccountID
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
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
            freelancer {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            domainSlug {
              slug
              freelancerID
              pendingEmail
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
        domainSlug {
          slug
          freelancerID
          pendingEmail
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
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
            freelancer {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            domainSlug {
              slug
              freelancerID
              pendingEmail
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
      nextToken
    }
  }
`;
export const listDomainSlugs = /* GraphQL */ `
  query ListDomainSlugs(
    $slug: ID
    $filter: ModelDomainSlugFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDomainSlugs(
      slug: $slug
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        slug
        freelancerID
        pendingEmail
        createdAt
        updatedAt
        hireMeInfo {
          freelancerID
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
          freelancer {
            id
            name
            title
            company
            email
            avatar {
              key
              tag
            }
            phone
            address
            taxID
            signedOutAuthToken
            role
            stripeAccountID
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
          domainSlug {
            slug
            freelancerID
            pendingEmail
            createdAt
            updatedAt
            hireMeInfo {
              freelancerID
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
              freelancer {
                id
                name
                title
                company
                email
                phone
                address
                taxID
                signedOutAuthToken
                role
                stripeAccountID
                createdAt
                updatedAt
              }
              domainSlug {
                slug
                freelancerID
                pendingEmail
                createdAt
                updatedAt
              }
            }
          }
        }
      }
      nextToken
    }
  }
`;
export const getDomainSlug = /* GraphQL */ `
  query GetDomainSlug($slug: ID!) {
    getDomainSlug(slug: $slug) {
      slug
      freelancerID
      pendingEmail
      createdAt
      updatedAt
      hireMeInfo {
        freelancerID
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
        freelancer {
          id
          name
          title
          company
          email
          avatar {
            key
            tag
          }
          phone
          address
          taxID
          signedOutAuthToken
          role
          stripeAccountID
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
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
            freelancer {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            domainSlug {
              slug
              freelancerID
              pendingEmail
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
        domainSlug {
          slug
          freelancerID
          pendingEmail
          createdAt
          updatedAt
          hireMeInfo {
            freelancerID
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
            freelancer {
              id
              name
              title
              company
              email
              avatar {
                key
                tag
              }
              phone
              address
              taxID
              signedOutAuthToken
              role
              stripeAccountID
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
            domainSlug {
              slug
              freelancerID
              pendingEmail
              createdAt
              updatedAt
              hireMeInfo {
                freelancerID
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
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      projectFreelancerID
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        projectFreelancerID
        title
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuotePayment = /* GraphQL */ `
  query GetQuotePayment($id: ID!) {
    getQuotePayment(id: $id) {
      id
      fromUserID
      toUserID
      quoteID
      amount
      createdAt
      updatedAt
    }
  }
`;
export const listQuotePayments = /* GraphQL */ `
  query ListQuotePayments(
    $filter: ModelQuotePaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuotePayments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fromUserID
        toUserID
        quoteID
        amount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
