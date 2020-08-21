# Contributing

We recommend that you use an [example](./example) or external app when developing and testing changes to this library.

## Setup

You can use linking to see new library changes as you're developing them.

In the library repo root:

```shell
$ yarn             # fetches the dependencies
$ yarn build       # produces a built version of the package
$ cd dist          # move to the dist directory (now containing the built package)
$ yarn link        # link the package
$ cd ..            # go back to the repo root
$ yarn build:watch # rebuild on changes
```

Now in an example dir:

```shell
$ yarn                   # fetch the dependencies
$ yarn link sajari-react # use the version of sajari-react in the repo
$ yarn start             # build/start your app...
```

## Release

1. Update [package.json](package.json) with the new version number
1. Create a release commit with a message of the form `pkg: release <version>` and push to GitHub
1. Create a tag with the new version number and push to GitHub
1. Run `npm publish . --tag latest --access public`
