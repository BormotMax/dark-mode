import { DependencyList } from 'react';
import Storage from '@aws-amplify/storage';

import { useAsync, AsyncState } from './useAsync';
import { useLogger } from './useLogger';

export const useStorageLink = (key: string | null, dependencies: DependencyList = []): AsyncState<string> => {
  const { logger } = useLogger();
  return useAsync(
    async () => {
      if (!key) {
        return '';
      }
      try {
        const link = await Storage.get(key);
        if (typeof link === 'string') {
          return link;
        }
        return '';
      } catch (error) {
        logger.error('Error retrieving file from s3', { error, input: key });
        return '';
      }
    },
    dependencies,
  );
};
