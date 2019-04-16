## Introduction

This starter kit aims to quick start a TypeScript web application with SSR enabled.

It provides:
- Typescript integration through Babel
- Double build with Webpack
- Watch/dev mode for SSR and double build
- ESLint linting
- Jest setup with Enzyme
- CircleCI integration
- Heroku deployment (review apps ready)
- Changelog generator through Yarn/NPM release command
- Editorconfig setup
- Browserlist (supported browser list)
- Yarn workspaces

Recommend way to setup the project is to create to following files/directories and to start from there:

```
packages/
|- api
|   |- api.tsx  # This file will be the main entry point for backend application
|- app
|   |- app.tsx  # Entry point of your frontend application
|   |- index.html  # HTML file that will be used as a base for server side rendering
|   |- root.tsx  # Main component that will be used with both client and server side
```

Also inspect code and look for `TODO`s to setup your project. You'll need to configuration
name, description and icons/logos for your WebApp.

# Keep Content bellow

## Installation

Requires:
- [Node](https://nodejs.org/en/): > 11.12.0
- [Yarn](https://yarnpkg.com/lang/en/): > 1.13.0

Install dependencies with:

```bash
yarn
```

## Usage

Run project with:

```bash
yarn dev
```

Build project for production with:

```bash
yarn build
```

## Structure

Project uses Yarn workspaces to split functionalities into local `node_module` (namespace `@assmat-facile`).

### Frontend

Frontend application is written in [React](https://reactjs.org/) using TypeScript. CSS is done via
[Emotion](https://emotion.sh/docs/introduction). Application texts are stored in a language file loaded via
[React I18Next](https://react.i18next.com/) to make text finding/writing easier.

### Backend

The backend server is a simple Express application which make the SSR for the application and serve it's files. It's
also compiled via webpack to prevent compilation differences with the frontend.

## Contributing

### Code quality

Code quality is ensured via TypeScript, ESLint and Jest.

Typechecking is done via the TSC compiler because when TypeScript is compiled via babel, it does
not check for type errors. To ensure typings are correct in the project, run:

```bash
yarn typecheck
```

Code style is ensure via ESLint. It uses the AirBnB configuration as a base and overridden with some
typescript recommendations. Linting can be run with:

```bash
yarn lint
```

You can use the `--cache` flag to lint faster on consecutive runs.

Testing is done via Jest using the following command:

```bash
yarn test
```

Prefer writing snapshot tests with `enzyme` for React component.

### Commit messages

Commit messages are used for the generation of the [changelog](./CHANGELOG.md) file. Therefore it requires to use a
specific commit message format to make sure it looks pretty and human readable.

```
type(scope): Your message
```

For example:

```
feat(sign-in): Use cookie authentication
```

Valid types are:

* `feat`: Everything to introduces a new feature or enhance an existing one. This will appear in the changelog.
* `refactor`: For the code refactoring and tasks that implies only technical validation.
* `test`: Use this for commits containing only test code (add unit or feature tests).
* `chore`: This is for commits about the build process and tooling.
* `docs`: When you modify or add documentation only, use this type.
* `fix`: Use this for little fixes and bugs.

Some additional rules:

* Always **SQUASH** merge your pull requests. WIP and fix commits must not go to develop. 
* Never forget the US reference, it helps reviewers finding the purpose of your code.
* Do not commit to master directly.
