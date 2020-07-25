import md5 from 'md5';

export const gravatarUrl = (email: string): string => `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}`;
