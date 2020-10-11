# Sajari React SDK

## Usage

`@sajari/react-sdk` is a client side javascript library of React Components for the
[Sajari](https://www.sajari.com) search platform to help build fast and powerful search interfaces. The monorepo consists of main 3 packages:

- `@sajari/react-hooks` - Hooks that allow you to build a search interface using any components.
- `@sajari/react-components` - The bare components that allow you to build an interface using a search back end other than Sajari.
- `@sajari/react-sdk` - The “compositions” like we have in v2 but with new styling and using the components and hooks behind the scenes.

You can install all the dependencies in the root directory. Since the monorepo uses Lerna and Yarn Workspaces, npm CLI is not supported (only yarn).

```sh
yarn install
```

This will install all dependencies in each project, build them, and symlink them via Lerna

## Development workflow

In one terminal, run tsdx watch in parallel:

```sh
yarn start
```

This builds each package to `<packages>/<package>/dist` and runs the project in watch mode so any edits you save inside `<packages>/<package>/src` cause a rebuild to `<packages>/<package>/dist`. The results will stream to to the terminal.

### Using the example/playground

You can play with local packages in the Parcel-powered example/playground.

```sh
cd example
yarn install # or yarn install
yarn start
```

This will start the example/playground on `localhost:1234`. If you have lerna running watch in parallel mode in one terminal, and then you run parcel, your playground will hot reload when you make changes to any imported module whose source is inside of `packages/*/src/*`. Note that to accomplish this, each package's `start` command passes TDSX the `--noClean` flag. This prevents Parcel from exploding between rebuilds because of File Not Found errors.

Important Safety Tip: When adding/altering packages in the playground, use `alias` object in package.json. This will tell Parcel to resolve them to the filesystem instead of trying to install the package from NPM. It also fixes duplicate React errors you may run into.

#### Yalc

[Yalc](https://github.com/whitecolor/yalc) is an alternative to `yarn/npm link` (and Parcel aliasing) that many developers find useful because it more closely mimics how NPM works. It works kind of like a local package registry via filesystem and symlinking magic.

To do this, install yalc globally.

Using NPM:

```sh
npm i yalc -g
```

Using Yarn:

```sh
yarn global add yalc
```

Then in each package's `start` command add a [`yalc publish`](https://github.com/whitecolor/yalc#publish) or `yalc push` as an TSDX `--onSuccess` hook.

```diff
"scripts": {
-   "start": "tsdx watch --verbose --noClean",
+   "start": "tsdx watch --verbose --noClean --onSuccess yalc publish",
    "build": "tsdx build --tsconfig tsconfig.build.json",
    "test": "tsdx test",
    "lint": "tsdx lint",
    "prepublish": "npm run build"
  },
```

In your example directory, now add each package via yalc

```sh
yalc add <package>
# or
yalc link <package>
```

There's definitely room for improvement with this workflow, so please contribute if you come up with something better.
