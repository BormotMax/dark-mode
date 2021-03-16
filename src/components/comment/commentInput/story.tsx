import base from 'paths.macro';
import * as React from 'react';

import { initSetStory } from '../../../storybook/init-set-story';

import { CommentInput } from './commentInput';

const Config = initSetStory(base, CommentInput);
const argTypes = {
  email: {
    name: 'Email (for gravatar)',
    control: { type: 'text' },
  },
  s3key: {
    name: 's3key (for continuum avatar)',
    control: { type: 'text' },
  },
};

const defaultArgs = {
  email: '',
  s3key: '',
};

Config.args = defaultArgs;
Config.argTypes = argTypes;
export default Config;

export const Default = (args):JSX.Element => (
  <div
    style={{
      maxWidth: '802px',
      width: '100%',
      marginTop: 'auto',
      marginBottom: 50,
      padding: '0 50px',
    }}
  >
    <CommentInput {...args} projectID="" creatorID="" />
  </div>
);
