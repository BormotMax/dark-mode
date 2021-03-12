# Roles and access
The project uses the following roles:
- `ADMIN`
- `FREELANCER`
- `CLIENT`

## ADMIN
- has access to content covered by the `Protected` component,
- does not have access to content covered by the `ProtectedElse` component -> <br>
`src/components/protected/protected.tsx`;
- has access to the page `/all-users` -> <br>
`src/pages/all-users.tsx`;
- has access to the `/projects` page -> <br>
`src/pages/projects.tsx`;
- has access to the `/hire-page-editor` page -> <br>
`src/pages/hire-page-editor.tsx`;
- a button for adding a new `Quote` is available -> <br>
`src/components/addQuoteModal/addQuoteModal.tsx`;
- available tab `Notes` in the project menu -> <br>
`src/components/projectMenu/projectMenu.tsx`;
- unavailable button `ACCEPT AND PAY $(price)` -> <br>
`src/components/comment/quoteForComment/quoteForComment.tsx`;
- the option of adding a person to the `FREELANCER` team is available -> <br>
`src/components/contactPreview/contactPreview.tsx`;
- available `Edit` button in `Header` on `/hire/something` page -> <br>
`src/pages/hire/[id].tsx`;
- available button `New Project` in` Header` on page `/projects`,
- available `Save` button in` Header` on `/hire-page-editor` page,
- available breadcrumbs instead of header title in `/projects` and `/projects/[id]` pages,
- header title is not visible on pages `/projects` and `/projects/[id]`,
- navigation is available in the mobile version of the project,
- navigation is available in the desktop version of the project -> <br>
`src/components/pageLayout/pageLayout.tsx`;
- available to change the status of tasks for `Quote`,
- available to add new tasks for `Quote` -> <br>
`src/components/quote/quoteProgress.tsx`;
- the button for adding `Assets` is available -> <br>
`src/components/tabs/filesTab.tsx`;
- available button for adding a note to `Notes` -> <br>
`src/components/tabs/notesTab.tsx`;
- available tab `Payments` in settings -> <br>
`src/components/settings/settings.tsx`;

## FREELANCER
- has access to the `/projects` page -> <br>
`src/pages/projects.tsx`;
- has access to the `/hire-page-editor` page -> <br>
`src/pages/hire-page-editor.tsx`;
- used to filter users by this role and copy their emails on the `/all-users` page,
- used to filter users by this role and display their cards on the `/all-users` page -> <br>
`src/pages/all-users.tsx`;
- how the role can be specified when adding a person to the project -> <br>
`src/components/contactPreview/contactPreview.tsx`;
- a button for adding a new `Quote` is available -> <br>
`src/components/addQuoteModal/addQuoteModal.tsx`;
- available tab `Notes` in the project menu -> <br>
`src/components/projectMenu/projectMenu.tsx`;
- unavailable button `ACCEPT AND PAY $(price)` -> <br>
`src/components/comment/quoteForComment/quoteForComment.tsx`;
- the option of adding a person to the `FREELANCER` team is available -> <br>
`src/components/contactPreview/contactPreview.tsx`;
- available `Edit` button in` Header` on `/hire/something` page -> <br>
`src/pages/hire/[id].tsx`;
- available button `New Project` in `Header` on page `/projects`,
- available `Save` button in `Header` on `/hire-page-editor` page,
- available breadcrumbs instead of header title in `/projects` and `/projects/[id]` pages,
- header title is not visible on pages `/projects` and `/projects/[id]`,
- navigation is available in the mobile version of the project,
- navigation is available in the desktop version of the project -> <br>
`src/components/pageLayout/pageLayout.tsx`;
- available to change the status of tasks for `Quote`,
- available to add new tasks for `Quote` -> <br>
`src/components/quote/quoteProgress.tsx`;
- the button for adding `Assets` is available -> <br>
`src/components/tabs/filesTab.tsx`;
- available button for adding a note to `Notes` -> <br>
`src/components/tabs/notesTab.tsx`;
- available tab `Payments` in settings -> <br>
`src/components/settings/settings.tsx`;

## CLIENT
- the role is specified when the user is created in the `Hello There!` modal in `/hire/something` -> <br>
`src/components/hireMeModal/hireMeModal.tsx`;
- the role can be specified when adding a person to the project -> <br>
`src/components/contactPreview/contactPreview.tsx`;
- does not have access to the page `/all-users` -> <br>
`src/pages/all-users.tsx`;
- does not have access to the `/projects` page -> <br>
`src/pages/projects.tsx`;
- does not have access to the `/hire-page-editor` page -> <br>
`src/pages/hire-page-editor.tsx`;
- button for adding a new `Quote` is not available -> <br>
`src/components/addQuoteModal/addQuoteModal.tsx`;
- Notes tab is not available in the project menu -> <br>
`src/components/projectMenu/projectMenu.tsx`;
- available button `ACCEPT AND PAY $(price)` -> <br>
`src/components/comment/quoteForComment/quoteForComment.tsx`;
- the option to add a person to the freelance team is not available -> <br>
`src/components/contactPreview/contactPreview.tsx`;
- not available `Edit` button in `Header` on `/hire/something` page -> <br>
`src/pages/hire/[id].tsx`;
- breadcrumbs are not available instead of a header title in the `/projects` and `/projects/[id]` pages,
- header title is visible on pages `/projects` and `/projects/[id]`,
- navigation is not available in the mobile version of the project,
- navigation is not available in the desktop version of the project -> <br>
`src/components/pageLayout/pageLayout.tsx`;
- not available to change the status of tasks for `Quote`,
- not available to add new tasks for `Quote` -> <br>
`src/components/quote/quoteProgress.tsx`;
- button for adding files `Assets` is not available -> <br>
`src/components/tabs/filesTab.tsx`;
