import * as React from 'react';

import { FreelancerProject, Project, UsersList } from '../types/custom';
import { UserRole } from '../API';

type MouseEvent = React.MouseEvent<EventTarget>;
type KeyboardEvent = React.KeyboardEvent<EventTarget>;

function isMouseEvent(event: MouseEvent | KeyboardEvent): event is MouseEvent {
  return event.nativeEvent instanceof MouseEvent;
}

export const isPressEnter = (event: KeyboardEvent): boolean => event.key === 'Enter';

export const isClickOrEnter = (event: MouseEvent | KeyboardEvent): boolean => {
  if (isMouseEvent(event)) {
    return true;
  }
  return isPressEnter(event);
};

export const getDatasetValue = (target: EventTarget, key: string): string | null => {
  if (target instanceof HTMLElement) {
    return target?.dataset?.[key];
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const truncate = (str, length = 100, ending = '...') => {
  if (!str) {
    // eslint-disable-next-line no-param-reassign
    str = '';
  }

  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }
  return str;
};

export const filterUsersByRole = (
  users: UsersList,
  role: UserRole,
  exclude = false,
  sort = true,
): UsersList => {
  const filteredUsers = users
    .filter((user) => (exclude ? user.role !== role : user.role === role));

  if (!sort) {
    return filteredUsers;
  }
  return filteredUsers.sort((b, a) => (
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  ));
};

export const getProjectTitle = (project: Project | FreelancerProject): string => {
  const client = project?.clients?.items?.find((item) => item?.isInitialContact);
  const clientName = client?.user?.name;
  return project?.title || clientName || 'Title';
};

export const toggleMode = (): void => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('mode', 'dark');
  } else {
    localStorage.setItem('mode', 'light');
  }
};
