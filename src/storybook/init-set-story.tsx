import * as React from 'react';

import { setStoriesGroup } from './set-stories-group';
import { WrapperStory } from './wrapper-story';

export const initSetStory = (
  pathToDir: string,
  component?: React.FC<any> | (() => any), // eslint-disable-line @typescript-eslint/no-explicit-any
  commonProps?: WrapperStory,
): ReturnType<typeof setStoriesGroup> => {
  const config = setStoriesGroup(pathToDir, component);
  config.decorators = [
    (Story, other) => (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      <WrapperStory {...commonProps} {...other.args}>
        <Story />
      </WrapperStory>
    ),
  ];

  return config;
};
