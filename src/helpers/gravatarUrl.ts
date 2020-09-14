import md5 from 'md5';

export const gravatarUrl = (email: string): string => {
  const e = email ? email.trim().toLowerCase() : '';
  return `https://www.gravatar.com/avatar/${md5(e)}?d=https%3A%2F%2Fcontinuum-resources.s3.amazonaws.com%2FblankAvatar.jpg`;
};
