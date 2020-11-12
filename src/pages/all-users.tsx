import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import classnames from 'classnames';
import Link from 'next/link';
import { WithAuthentication, RouteType, Role } from '../components/withAuthentication';
import { client } from './_app';
import { ListUsersQuery } from '../API';
import { useFlash, useLogger } from '../hooks';
import { PageLayoutOne } from '../components/pageLayoutOne';
import { Page } from '../components/nav/nav';
import { listUsers } from '../graphql/queries';
import styles from './styles/allUsers.module.scss';

const AllUsersPage: React.FC = () => {
  const [users, setUsers] = useState([]);
  const { setFlash } = useFlash();
  const { logger } = useLogger();

  const fetchUsers = async () => {
    try {
      const listUsersResult: { data: ListUsersQuery } = await client.query({ query: gql(listUsers) });

      const p = listUsersResult.data?.listUsers?.items || [];
      setUsers(p);
    } catch (error) {
      setFlash("There was an error retrieving the users. We're looking into it.");
      logger.error('AllUsersPage: error retrieving users.', { error });
    }
  };

  useEffect(() => {
    const execute = async () => {
      fetchUsers();
    };
    execute();
  }, []);

  const copyEmails = () => {
    const tempInput = document.createElement('input');
    tempInput.value = users
      .filter(Boolean)
      .filter((user) => user.role === Role.FREELANCER)
      .map((user) => user.email)
      .join(',');
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  };

  const freelancers = users
    .filter(Boolean)
    .filter((user) => user.role === Role.FREELANCER)
    .sort((b, a) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return (
    <PageLayoutOne
      headerText={
        <>
          All Users - <small>Admin Only</small>
        </>
      }
      page={Page.ALL_USERS}
    >
      <div className={classnames('column', 'is-narrow', styles.allUsers)}>
        <button type="button" onClick={copyEmails} className="button">
          Copy freelancer emails to clipboard
        </button>
        <h2>Freelancer Accounts ({freelancers.length})</h2>
        <div className={classnames(styles.section)}>
          {freelancers
            .map((user) => (
              <Card key={user.id} user={user} />
            ))}
        </div>
        <h2>Clients</h2>
        {users
          .filter(Boolean)
          .filter((user) => user.role !== Role.FREELANCER)
          .sort((b, a) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .map((user) => (
            <Card key={user.id} user={user} />
          ))}
      </div>
    </PageLayoutOne>
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
            <Link href="/hire/[id]" as={`/hire/${slug}`}>
              <a href={`/hire/${slug}`}>
                continuum.works/hire/{slug}
              </a>
            </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WithAuthentication(AllUsersPage, { routeType: RouteType.SIGNED_IN, allowedRoles: [Role.ADMIN] });
