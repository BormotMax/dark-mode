export const data = {
  company: { name: "Tennis Supplies Inc.", email: "http://tennisballs.com" },
  submittedAt: "47 minutes ago",
  header: "First Contact from Dahlia Ali",
  client: { name: "Dahlia Ali" },
  notes:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tasks: [
    { text: "Update logo design" },
    { text: "Create new wireframes and user stories for website" },
    { text: "New copy and brand messaging" },
    {
      text:
        "Add functionality for users to contact us for customer tennis balls",
    },
    { text: "Ongoing dev support" },
  ],
  comments: [
    {
      name: "Dahlia Ali",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      createdAt: "21 minutes ago",
    },
    {
      name: "Jason Curry",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      createdAt: "4 minutes ago",
      quote: {
        tasks: [
          { text: "Update logo design" },
          { text: "Create new wireframes and user stories for website" },
          { text: "New copy and brand messaging" },
          {
            text:
              "Add functionality for users to contact us for customer tennis balls",
          },
          { text: "Ongoing dev support" },
        ],
      },
    },
  ],
}
