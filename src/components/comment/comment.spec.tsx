import { render } from '@testing-library/react';
import { Comment } from './comment';
import { Comment as CommentType } from '../../types/custom';
import { UserRole } from '../../API';

const comment:CommentType = {
  id: '1',
  content: 'testContent',
  projectID: 'projectId',
  creatorID: '4',
  creator: {
    id: '2',
    name: 'test name',
    role: UserRole.FREELANCER,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    avatarUrl: 'url',
    __typename: 'User',
    projects: {
      items: [],
      __typename: 'ModelProjectConnection',
      nextToken: '',
    },
  },
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
  __typename: 'Comment',
};

describe('Comment', () => {
  it('renders without crashing', async () => {
    render(<Comment comment={comment} />);
  });
});
