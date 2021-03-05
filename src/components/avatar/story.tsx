import base from 'paths.macro';
import * as React from 'react';
import { Avatar, AvatarProps } from './avatar';
import { WrapperStory } from '../../storybook/wrapper-story';
import { initSetStory } from '../../storybook/init-set-story';

const Config = initSetStory(base, Avatar);

const argTypes = {
  email: {
    name: 'Email',
    control: { type: 'text' },
  },
  name: {
    name: 'Name',
    control: { type: 'text' },
  },
  width: {
    name: 'Width',
    control: { type: 'number' },
  },
  height: {
    name: 'Height',
    control: { type: 'number' },
  },
};

const defaultArgs: AvatarProps = {
  email: 'john@snow.com',
  name: 'John Know',
  width: 48,
  height: 48,
};

Config.args = defaultArgs;
Config.argTypes = argTypes;
export default Config;

export const Default = (args: AvatarProps): JSX.Element => (
  <WrapperStory>
    <Avatar {...args} />
  </WrapperStory>
);
