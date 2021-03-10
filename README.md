![Jest Tests](https://github.com/continuumworks/continuum/workflows/Jest%20Tests/badge.svg?branch=master)
![Cypress tests](https://github.com/continuumworks/continuum/workflows/Cypress%20tests/badge.svg)

## Developing locally
1. Clone repo `git clone https://github.com/continuumworks/continuum.git`
2. Install local dependencies `npm i`
3. Install Amplify `npm install -g @aws-amplify/cli`
4. Configure local environment for Amplify `amplify configure`,
   1. Follow instruction for auth, you should use the IAM shared by Continuum team
```
? Do you want to use an existing environment?
Yes
? Choose the environment you would like to use:
master
? Choose your default editor:
Visual Studio Code
? Do you want to use an AWS profile?
Yes
? Please choose the profile you want to use
<I think this profile is created during amplify configure>
✔ Initialized provider successfully.
Initialized your environment successfully.
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contribution
Create local branch for every feature using `feature/[xyz]` format. Submit PR and select Continuum team as reviewers.

## Documentation

- [Wiki](https://continuum-inc.slite.com)
- [Roles and access](docs/roles_and_access.md)

## Deploy

- Merge to master branch, next.js app will deploy to [Vercel](https://nextjs.org/docs/deployment)
- Or manually using `vercel --prod --scope continuum`

## SVG Icons

- All icons in the project must be svg react components (the exception is fontawesome-icons).
- Placement: `src/components/svgIcons`
- You can use [SVGR](https://react-svgr.com/playground/?memo=true&typescript=true) to convert.
