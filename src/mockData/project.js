export const data = {
  company: { name: 'Tennis Supplies Inc.', email: 'http://tennisballs.com' },
  submittedAt: new Date(),
  header: 'First Contact from Dahlia Ali',
  client: { name: 'Dahlia Ali' },
  notes:
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nUt enim ad minim veniam, quis nostrud exercitation 
    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
    id est laborum.`,
  tasks: [
    { id: 0, text: 'Update logo design', completed: false },
    {
      id: 1,
      text: 'Create new wireframes and user stories for website',
      completed: false,
    },
    { id: 2, text: 'New copy and brand messaging', completed: true },
    {
      id: 3,
      text:
        'Add functionality for users to contact us for customer tennis balls',
      completed: true,
    },
    { id: 4, text: 'Ongoing dev support', completed: true },
  ],
  comments: [
    {
      name: 'Dahlia Ali',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      createdAt: new Date(),
    },
    {
      name: 'Jason Curry',
      text:
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      createdAt: new Date(),
      quote: {
        tasks: [
          { text: 'Update logo design' },
          { text: 'Create new wireframes and user stories for website' },
          { text: 'New copy and brand messaging' },
          {
            text:
              'Add functionality for users to contact us for customer tennis balls',
          },
          { text: 'Ongoing dev support' },
        ],
      },
    },
  ],
  tabs: [
    {
      name: 'QUOTES',
    },
  ],
};

export const quotes = [
  {
    id: '1',
    sequenceNumber: 1,
    progress: 50,
    tasks: data.tasks,
  },
  {
    id: '2',
    sequenceNumber: 2,
    progress: 0,
    tasks: data.tasks.slice(0, 2),
  },
];

export const files = [
  {
    id: 1,
    title: 'Marketing Website & Style Guide',
    application: 'figma',
  },
  {
    id: 2,
    title: 'Wireframes and Prototype',
    application: 'framer',
  },
  {
    id: 3,
    title: 'Data for Tables',
    application: 'excel',
  },
  {
    id: 4,
    title: 'User Stories',
    application: 'miro',
  },
  {
    id: 5,
    title: 'Logo and Usage Rules',
    application: 'ai',
  },
  {
    id: 6,
    title: 'Dropbox Assets',
    application: 'dropbox',
  },
];
