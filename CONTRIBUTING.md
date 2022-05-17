# Contributing

We recommend that you use an [example](./example) or external app when developing and testing changes to this library.

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

#### Yarn link

https://classic.yarnpkg.com/en/docs/cli/link
`yarn link` is a command that helps during the development of npm packages. It links a local npm package to an existing project that uses yarn package manager. This will be helpful to make local changes to sdk-react reflected on other packages seamlessly

## Link

1. cd to the package you want to link (for example, `./packages/hooks`), then run:

```sh
yarn link
```

notice the package name on package.json, it should be `@sajari/*`. In this case we have `@sajari/react-hooks`

2. cd to the repository you want to link `@sajari/react-hooks` with, then run

```sh
yarn link @sajari/react-hooks
```

now `./packages/hooks` will be linked to `{YOUR_REPO}/node_modules` and changes to `./packages/hooks` will affect that repository instantly

## Unlink

If you don't want to use the local package anymore, run

```sh
yarn unlink @sajari/react-hooks
yarn install --force
```

to use the remote package

## Unlink all

To clear all the linked packages you have register to yarn, run

```sh
rm -rf ~/.config/yarn/link
yarn install --force
```

Check out `Yalc` if `yarn link` doesn't work for you!

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

## Release

1. Run `yarn release` which will trigger lerna to bump the appropriate package versions and build changelogs based on commits.
