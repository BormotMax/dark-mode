import md5 from 'md5';

export const gravatarUrl = (email: string): string => (email
  ? `https://www.gravatar.com/avatar/${md5(
    email.trim().toLowerCase(),
  )}?d=https%3A%2F%2Fcontinuum-resources.s3.amazonaws.com%2FblankAvatar.jpg`
  : '');
