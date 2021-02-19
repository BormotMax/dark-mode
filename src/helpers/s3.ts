import Storage from '@aws-amplify/storage';
import { v4 as uuid } from 'uuid';
import Rollbar from 'rollbar';

import { S3Avatar } from '../types/custom';

type CreateOrUpdateAvatarArguments = {
  key: string,
  name: string,
  page: string,
  file: File,
  logger: Rollbar,
};

export const createOrUpdateAvatar = async ({
  key,
  name,
  file,
  page,
  logger,
}: CreateOrUpdateAvatarArguments): Promise<S3Avatar> => {
  if (key) {
    try {
      await Storage.remove(key);
    } catch (error) {
      logger.error(`${page}: error deleting user avatar from s3`, { error, input: key });
    }
  }

  const s3Key = `${uuid()}${name}`;
  try {
    await Storage.put(s3Key, file);
  } catch (error) {
    logger.error(`${page}: error adding user avatar to s3`, { error, input: s3Key });
  }
  return { key: s3Key, tag: 'avatar' };
};
