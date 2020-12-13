/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const deleteProjectClient = /* GraphQL */ `
  mutation DeleteProjectClient(
    $input: DeleteProjectClientInput!
    $condition: ModelProjectClientConditionInput
  ) {
    deleteProjectClient(input: $input, condition: $condition) {
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
export const deleteProjectFreelancer = /* GraphQL */ `
  mutation DeleteProjectFreelancer(
    $input: DeleteProjectFreelancerInput!
    $condition: ModelProjectFreelancerConditionInput
  ) {
    deleteProjectFreelancer(input: $input, condition: $condition) {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
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
export const updateProjectAssets = /* GraphQL */ `
  mutation UpdateProjectAssets(
    $input: UpdateProjectAssetsInput!
    $condition: ModelProjectAssetsConditionInput
  ) {
    updateProjectAssets(input: $input, condition: $condition) {
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
export const deleteProjectAssets = /* GraphQL */ `
  mutation DeleteProjectAssets(
    $input: DeleteProjectAssetsInput!
    $condition: ModelProjectAssetsConditionInput
  ) {
    deleteProjectAssets(input: $input, condition: $condition) {
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
export const updateDomainSlug = /* GraphQL */ `
  mutation UpdateDomainSlug(
    $input: UpdateDomainSlugInput!
    $condition: ModelDomainSlugConditionInput
  ) {
    updateDomainSlug(input: $input, condition: $condition) {
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
export const deleteDomainSlug = /* GraphQL */ `
  mutation DeleteDomainSlug(
    $input: DeleteDomainSlugInput!
    $condition: ModelDomainSlugConditionInput
  ) {
    deleteDomainSlug(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      projectFreelancerID
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const updateQuotePayment = /* GraphQL */ `
  mutation UpdateQuotePayment(
    $input: UpdateQuotePaymentInput!
    $condition: ModelQuotePaymentConditionInput
  ) {
    updateQuotePayment(input: $input, condition: $condition) {
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
export const deleteQuotePayment = /* GraphQL */ `
  mutation DeleteQuotePayment(
    $input: DeleteQuotePaymentInput!
    $condition: ModelQuotePaymentConditionInput
  ) {
    deleteQuotePayment(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const createProjectClient = /* GraphQL */ `
  mutation CreateProjectClient(
    $input: CreateProjectClientInput!
    $condition: ModelProjectClientConditionInput
  ) {
    createProjectClient(input: $input, condition: $condition) {
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
export const updateProjectClient = /* GraphQL */ `
  mutation UpdateProjectClient(
    $input: UpdateProjectClientInput!
    $condition: ModelProjectClientConditionInput
  ) {
    updateProjectClient(input: $input, condition: $condition) {
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
export const createProjectFreelancer = /* GraphQL */ `
  mutation CreateProjectFreelancer(
    $input: CreateProjectFreelancerInput!
    $condition: ModelProjectFreelancerConditionInput
  ) {
    createProjectFreelancer(input: $input, condition: $condition) {
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
export const updateProjectFreelancer = /* GraphQL */ `
  mutation UpdateProjectFreelancer(
    $input: UpdateProjectFreelancerInput!
    $condition: ModelProjectFreelancerConditionInput
  ) {
    updateProjectFreelancer(input: $input, condition: $condition) {
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
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
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
export const createProjectAssets = /* GraphQL */ `
  mutation CreateProjectAssets(
    $input: CreateProjectAssetsInput!
    $condition: ModelProjectAssetsConditionInput
  ) {
    createProjectAssets(input: $input, condition: $condition) {
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
export const createQuote = /* GraphQL */ `
  mutation CreateQuote(
    $input: CreateQuoteInput!
    $condition: ModelQuoteConditionInput
  ) {
    createQuote(input: $input, condition: $condition) {
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
export const updateQuote = /* GraphQL */ `
  mutation UpdateQuote(
    $input: UpdateQuoteInput!
    $condition: ModelQuoteConditionInput
  ) {
    updateQuote(input: $input, condition: $condition) {
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
export const deleteQuote = /* GraphQL */ `
  mutation DeleteQuote(
    $input: DeleteQuoteInput!
    $condition: ModelQuoteConditionInput
  ) {
    deleteQuote(input: $input, condition: $condition) {
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
export const updateHireMeInfo = /* GraphQL */ `
  mutation UpdateHireMeInfo(
    $input: UpdateHireMeInfoInput!
    $condition: ModelHireMeInfoConditionInput
  ) {
    updateHireMeInfo(input: $input, condition: $condition) {
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
export const deleteHireMeInfo = /* GraphQL */ `
  mutation DeleteHireMeInfo(
    $input: DeleteHireMeInfoInput!
    $condition: ModelHireMeInfoConditionInput
  ) {
    deleteHireMeInfo(input: $input, condition: $condition) {
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
export const createDomainSlug = /* GraphQL */ `
  mutation CreateDomainSlug(
    $input: CreateDomainSlugInput!
    $condition: ModelDomainSlugConditionInput
  ) {
    createDomainSlug(input: $input, condition: $condition) {
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
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      projectFreelancerID
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      projectFreelancerID
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const createQuotePayment = /* GraphQL */ `
  mutation CreateQuotePayment(
    $input: CreateQuotePaymentInput!
    $condition: ModelQuotePaymentConditionInput
  ) {
    createQuotePayment(input: $input, condition: $condition) {
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
