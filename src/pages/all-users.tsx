import React, { useMemo } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';

import { WithAuthentication, RouteType, Role } from '../components/withAuthentication';
import { ListUsersQuery, UserRole } from '../API';
import { useFlash, useLogger } from '../hooks';
import { Page } from '../types/custom';
import PageLayout from '../components/pageLayout';
import { listUsers } from '../graphql/queries';
import { filterUsersByRole } from '../helpers/util';

import styles from './styles/allUsers.module.scss';

const AllUsersPage: React.FC = () => {
  const { setFlash } = useFlash();
  const { logger } = useLogger();

  const { data: { listUsers: { items: usersList = [] } = {} } = {} } = useQuery<ListUsersQuery>(
    gql(listUsers),
    {
      onError(error) {
        setFlash("There was an error retrieving the users. We're looking into it.");
        logger.error('AllUsersPage: error retrieving users.', { error });
      },
    },
  );
  const { users, freelancers, clients } = useMemo(
    () => {
      const filteredUsers = usersList.filter(Boolean);
      return {
        users: filteredUsers,
        freelancers: filterUsersByRole(filteredUsers, UserRole.FREELANCER),
        clients: filterUsersByRole(filteredUsers, UserRole.CLIENT),
      };
    },
    [usersList],
  );

  const copyFreelancersEmails = () => {
    const tempInput = document.createElement('input');
    tempInput.value = freelancers
      .map((user) => user.email)
      .join(',');
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  };

  return (
    <PageLayout page={Page.ALL_USERS}>
      <div className={classnames('column', 'is-narrow', styles.allUsers)}>
        <h2>{`Freelancers: ${freelancers.length}`}</h2>
        <h2>{`Clients: ${clients.length}`}</h2>
        <h2>{`All: ${users.length}`}</h2>
        <br />
        <button type="button" onClick={copyFreelancersEmails} className="button">
          Copy freelancer emails to clipboard
        </button>
        <h2>Freelancer Accounts ({freelancers.length})</h2>
        <div className={styles.section}>
          {freelancers.map((user) => <Card key={user.id} user={user} />)}
        </div>
        <h2>Clients</h2>
        {clients.map((user) => <Card key={user.id} user={user} />)}
      </div>
    </PageLayout>
  );
};

const Card = ({ user }) => {
  const slug = user?.hireMeInfo?.domainSlug?.slug;

  return (
    <div className={classnames('card', styles.card)}>
      <div className={classnames(styles.cardContent, 'card-content')}>
        <div>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Title:</b> {user.title}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
        </div>
        <div>
          <p>
            <b>Phone:</b> {user.phone}
          </p>
          <p>
            <b>Role:</b> {user.role}
          </p>
          <p>
            <b>Hire&nbsp;Page:</b>&nbsp;{slug && (
            <Link href="/[id]" as={`/${slug}`}>
              <a href={`/${slug}`}>
                continuum.works/{slug}
              </a>
            </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WithAuthentication(
  AllUsersPage,
  { routeType: RouteType.SIGNED_IN, allowedRoles: [Role.ADMIN] },
);
