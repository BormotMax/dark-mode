import base from 'paths.macro';
import * as React from 'react';
import { Avatar } from './avatar';
import { WrapperStory } from '../../storybook/wrapper-story';
import { setStoriesGroup } from '../../storybook/set-stories-group';

export default setStoriesGroup(base, Avatar);

export const Default = (): JSX.Element => (
  <WrapperStory>
    <Avatar
      email="john@snow.com"
      name="John Snow"
      width={48}
      height={48}
    />
  </WrapperStory>
);
