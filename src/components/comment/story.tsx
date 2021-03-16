import base from 'paths.macro';
import * as React from 'react';

import { initSetStory } from '../../storybook/init-set-story';

import { Comment } from './comment';

const Config = initSetStory(base, Comment);
const argTypes = {
  showInfo: {
    name: 'showInfo (Show author and time info)',
    control: { type: 'boolean' },
  },
  isLast: {
    name: 'isLast (Apply avatar and right bottom border 0)',
    control: { type: 'boolean' },
  },
  fluid: {
    name: 'fluid (100% width)',
    control: { type: 'boolean' },
  },
  largeSize: {
    name: 'largeSize (extra paddings and 100% width)',
    control: { type: 'boolean' },
  },
};

const defaultArgs = {
  comment: {
    creator: { name: 'Ellie Kemper' },
    createdAt: 16148916000,
    content: 'Hey, love your work, can we chat?',
  },
  showInfo: true,
  isLast: true,
  fluid: false,
  largeSize: false,
};

Config.args = defaultArgs;
Config.argTypes = argTypes;
export default Config;

export const Default = (args):JSX.Element => (
  <div
    style={{ padding: '0 50px', width: '80%', margin: '0 auto' }}
  >
    <Comment {...args} />
  </div>
);
