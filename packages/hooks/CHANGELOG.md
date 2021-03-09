# Change Log

## 1.4.10

### Patch Changes

- [`18c78432`](https://github.com/sajari/sdk-react/commit/18c7843271fdfcbdefede015bfd65decbf76e765) [#433](https://github.com/sajari/sdk-react/pull/433) Thanks [@tuanddd](https://github.com/tuanddd)! - Set searching state when calling pagination request

## 1.4.9

### Patch Changes

- [`b14aa3d1`](https://github.com/sajari/sdk-react/commit/b14aa3d13afd545186e7fd0a1758c8badb3de65c) [#425](https://github.com/sajari/sdk-react/pull/425) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Added support `frozen` state for `RangeFilterBuilder`. If `frozen` is `true`, blocking any update for `min`, `max` or `range`.

## 1.4.8

### Patch Changes

- [`3712d27a`](https://github.com/sajari/sdk-react/commit/3712d27a55cd764de79abdd5ee80854b2af7a9d8) [#417](https://github.com/sajari/sdk-react/pull/417) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed the issue of incorrect response after using filters. It was caused by the `filter()` method of a count aggregate filter will ignore the value that is not in the options.

* [`20a8a4e8`](https://github.com/sajari/sdk-react/commit/20a8a4e89fd812c6d3a8c8f68cc6797ac72d9bd2) [#420](https://github.com/sajari/sdk-react/pull/420) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed the issue when using the range filter will sometimes cause mismatches between the UI and the response. Previously, the attempt was to retain the previous range values once a new request was made, but it is tricky and often leads to the issues mentioned earlier. The change aims to simplify the logic:

  - Only update the `min` and `max` from the response if the query was changed.
  - Once the `min` and `max` changed, set the range to `[min, max]`.

## 1.4.7

### Patch Changes

- [`0662ebcb`](https://github.com/sajari/sdk-react/commit/0662ebcb580635607db02eb5f766b182ad42a673) [#413](https://github.com/sajari/sdk-react/pull/413) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Made clear method public in useSearchContext so that it can be used to reset the response.

## 1.4.6

### Patch Changes

- [`56de65d5`](https://github.com/sajari/sdk-react/commit/56de65d5266b4479bdaef982837320b2fc9ecc27) [#408](https://github.com/sajari/sdk-react/pull/408) Thanks [@sampotts](https://github.com/sampotts)! - Add support (max|min)-aggregate-filter in RangeInput

## 1.4.5

### Patch Changes

- [`21c0324b`](https://github.com/sajari/sdk-react/commit/21c0324b6771738505de6ad0e66ecc56320c17b0) [#387](https://github.com/sajari/sdk-react/pull/387) Thanks [@tuanddd](https://github.com/tuanddd)! - Remove duplicating \_id filter

- Updated dependencies [[`20b35922`](https://github.com/sajari/sdk-react/commit/20b35922f07512c9b4581c25a5d71941cb465010)]:
  - @sajari/react-sdk-utils@1.3.5

## 1.4.4

### Patch Changes

- [`2ffbc5d9`](https://github.com/sajari/sdk-react/commit/2ffbc5d9dc9de2e28413b7314b9733e65d35032a) [#385](https://github.com/sajari/sdk-react/pull/385) Thanks [@sampotts](https://github.com/sampotts)! - Package updates and minor doc updates

## 1.4.3

### Patch Changes

- [`8f1bd0e6`](https://github.com/sajari/sdk-react/commit/8f1bd0e6d197f19dca1c1af2bc2d2f1e2785d4fb) [#374](https://github.com/sajari/sdk-react/pull/374) Thanks [@sampotts](https://github.com/sampotts)! - Allow ClickTracking on non URL fields

- Updated dependencies [[`d1af5773`](https://github.com/sajari/sdk-react/commit/d1af57738741a0600e2d15797ffff5648d1c4334)]:
  - @sajari/react-sdk-utils@1.3.3

## 1.4.2

### Patch Changes

- [`3953b091`](https://github.com/sajari/sdk-react/commit/3953b091c4d4b899f570f5d6ed33bf5858eb319e) [#369](https://github.com/sajari/sdk-react/pull/369) Thanks [@sampotts](https://github.com/sampotts)! - Added support for originalPrice field

- Updated dependencies [[`3953b091`](https://github.com/sajari/sdk-react/commit/3953b091c4d4b899f570f5d6ed33bf5858eb319e)]:
  - @sajari/react-sdk-utils@1.3.2

## 1.4.1

### Patch Changes

- [`85d52aa9`](https://github.com/sajari/sdk-react/commit/85d52aa91b95810ef6342b6ea9ac7f785072b1dc) [#359](https://github.com/sajari/sdk-react/pull/359) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix using `useRangeFilter` will trigger an unwanted call of `reset` method in `didMount` phase.

* [`fdfe9680`](https://github.com/sajari/sdk-react/commit/fdfe9680d8c79afffd51705b1687db8aae81481e) [#358](https://github.com/sajari/sdk-react/pull/358) Thanks [@tuanddd](https://github.com/tuanddd)! - useFilter - add params to the other sortItems call

## 1.4.0

### Minor Changes

- [`b4157abb`](https://github.com/sajari/sdk-react/commit/b4157abb1daf7b2d2be878c7cbe66ca175db74dd) [#354](https://github.com/sajari/sdk-react/pull/354) Thanks [@tuanddd](https://github.com/tuanddd)! - add support for sorting price range

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.3.0](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.2.3...@sajari/react-hooks@1.3.0) (2021-01-14)

### Features

- add support for concatenating variables.filter and filters ([#352](https://github.com/sajari/sdk-react/issues/352)) ([2458dd3](https://github.com/sajari/sdk-react/commit/2458dd38e05cfc68a433538e2bf78d6f493d4509))

## [1.1.1](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.1.0...@sajari/react-hooks@1.1.1) (2021-01-08)

### Bug Fixes

- initial count filter field is always empty ([#309](https://github.com/sajari/sdk-react/issues/309)) ([3405723](https://github.com/sajari/sdk-react/commit/3405723c5cd898a2c184d385db537af3935cd247))
- make RangeFilter more failsafe default for non aggregate ([#313](https://github.com/sajari/sdk-react/issues/313)) ([eb4c40d](https://github.com/sajari/sdk-react/commit/eb4c40d2951cb960ec50c789a22dffdac5596d23))

# [1.1.0](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.8...@sajari/react-hooks@1.1.0) (2021-01-07)

### Features

- added image hover support to Results ([3fddbdc](https://github.com/sajari/sdk-react/commit/3fddbdc57b77fe06ce5d04a9bdbeb7e10d464ee5))

## [1.0.8](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.7...@sajari/react-hooks@1.0.8) (2021-01-05)

**Note:** Version bump only for package @sajari/react-hooks

## [1.0.7](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.6...@sajari/react-hooks@1.0.7) (2020-12-31)

**Note:** Version bump only for package @sajari/react-hooks

## [1.0.6](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.5...@sajari/react-hooks@1.0.6) (2020-12-21)

**Note:** Version bump only for package @sajari/react-hooks

## [1.0.5](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.4...@sajari/react-hooks@1.0.5) (2020-12-21)

**Note:** Version bump only for package @sajari/react-hooks

## [1.0.4](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.3...@sajari/react-hooks@1.0.4) (2020-12-18)

### Bug Fixes

- default usePagination argument to ‘search’ ([2621f46](https://github.com/sajari/sdk-react/commit/2621f46d6b000567ecc809ad34ed34e1ead02b54))

## [1.0.3](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.2...@sajari/react-hooks@1.0.3) (2020-12-16)

**Note:** Version bump only for package @sajari/react-hooks

## [1.0.2](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.1...@sajari/react-hooks@1.0.2) (2020-12-15)

**Note:** Version bump only for package @sajari/react-hooks

## [1.0.1](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0...@sajari/react-hooks@1.0.1) (2020-12-15)

**Note:** Version bump only for package @sajari/react-hooks

# 1.0.0 (2020-12-14)

### Features

- merged v3 to master ([ba23102](https://github.com/sajari/sdk-react/commit/ba231022d78013689f69767e87b152d55ece1d6a))

# [1.0.0-beta.10](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-beta.9...@sajari/react-hooks@1.0.0-beta.10) (2020-12-14)

### Bug Fixes

- rename isChanged to hasChanged on RangeFilterBuilder ([bfcc214](https://github.com/sajari/sdk-react/commit/bfcc214ca7984f642a44c7bf20b6740b15a945d9))
- sentence case errors ([df02aac](https://github.com/sajari/sdk-react/commit/df02aacb8a3486dff318bb749fcd9613f80f995a))

# [1.0.0-beta.9](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-beta.8...@sajari/react-hooks@1.0.0-beta.9) (2020-12-11)

### Bug Fixes

- set initialResponse in defaultState to prevent client side render ([2f2f8ba](https://github.com/sajari/sdk-react/commit/2f2f8ba5a02995d567ebf0835b5be4ef43790037))

# [1.0.0-beta.8](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-beta.7...@sajari/react-hooks@1.0.0-beta.8) (2020-12-10)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-beta.7](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-beta.6...@sajari/react-hooks@1.0.0-beta.7) (2020-12-10)

### Features

- add support for fetching data in SSR mode ([#285](https://github.com/sajari/sdk-react/issues/285)) ([f096531](https://github.com/sajari/sdk-react/commit/f09653138017c855e83850807c2fab376a5f8842))
- add support for SSR key/secret auth ([ae819c0](https://github.com/sajari/sdk-react/commit/ae819c0656c86cdb69981e96c6c45ef4f3469467))

# [1.0.0-beta.6](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-beta.5...@sajari/react-hooks@1.0.0-beta.6) (2020-12-09)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-beta.5](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-beta.4...@sajari/react-hooks@1.0.0-beta.5) (2020-12-04)

### Bug Fixes

- more renaming issues ([9e0fc65](https://github.com/sajari/sdk-react/commit/9e0fc65c124487f3c9f2b97104da910fc7f6cf2b))

# [1.0.0-beta.4](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-beta.3...@sajari/react-hooks@1.0.0-beta.4) (2020-12-04)

### Bug Fixes

- more git naming fixes ([cf32aee](https://github.com/sajari/sdk-react/commit/cf32aee4dfa929cc501d75f6bf9c4817c8577574))

# [1.0.0-beta.3](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-beta.2...@sajari/react-hooks@1.0.0-beta.3) (2020-12-04)

### Bug Fixes

- fixed another git filename issue ([b8866c3](https://github.com/sajari/sdk-react/commit/b8866c330e835d2cacadafc259e739b17ba4d9d6))

# [1.0.0-beta.2](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-beta.1...@sajari/react-hooks@1.0.0-beta.2) (2020-12-04)

### Bug Fixes

- fixed issue with filename ([7c79a44](https://github.com/sajari/sdk-react/commit/7c79a448a2fc907df27ae0b280e252eceb03da2e))

# [1.0.0-beta.1](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.31...@sajari/react-hooks@1.0.0-beta.1) (2020-12-04)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-alpha.31](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.30...@sajari/react-hooks@1.0.0-alpha.31) (2020-12-04)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-alpha.30](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.29...@sajari/react-hooks@1.0.0-alpha.30) (2020-12-03)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-alpha.29](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.28...@sajari/react-hooks@1.0.0-alpha.29) (2020-12-03)

### Bug Fixes

- slow render time in Swatch and Pagination ([#269](https://github.com/sajari/sdk-react/issues/269)) ([e3fd1b2](https://github.com/sajari/sdk-react/commit/e3fd1b299086d73c7e334341142c4f85ece44047))

# [1.0.0-alpha.28](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.27...@sajari/react-hooks@1.0.0-alpha.28) (2020-12-03)

### Bug Fixes

- inherit fontFamily in input components ([2823134](https://github.com/sajari/sdk-react/commit/2823134617c74ee65b17d160375fe48c28a37f7c))

# [1.0.0-alpha.27](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.26...@sajari/react-hooks@1.0.0-alpha.27) (2020-12-03)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-alpha.26](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.25...@sajari/react-hooks@1.0.0-alpha.26) (2020-12-03)

### Bug Fixes

- empty query search logic ([#274](https://github.com/sajari/sdk-react/issues/274)) ([37acaee](https://github.com/sajari/sdk-react/commit/37acaeefe1b2e30e97461527b4a95522e15ccef5))

# [1.0.0-alpha.25](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.24...@sajari/react-hooks@1.0.0-alpha.25) (2020-12-02)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-alpha.24](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.23...@sajari/react-hooks@1.0.0-alpha.24) (2020-12-02)

### Bug Fixes

- default count to false for bucket filters ([19dfdc2](https://github.com/sajari/sdk-react/commit/19dfdc2fe11539f6bbbb04077963c92fb4d02f63))

# [1.0.0-alpha.23](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.22...@sajari/react-hooks@1.0.0-alpha.23) (2020-12-01)

### Bug Fixes

- fix issue with filters disappearing while searching ([bab000a](https://github.com/sajari/sdk-react/commit/bab000a04b57525fd00b439465dd94ceb0b974e8))

# [1.0.0-alpha.22](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.21...@sajari/react-hooks@1.0.0-alpha.22) (2020-12-01)

### Features

- added empty property to useSearchContext ([00b078d](https://github.com/sajari/sdk-react/commit/00b078d886158f1724e6781477db418687e92d81))

# [1.0.0-alpha.21](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.20...@sajari/react-hooks@1.0.0-alpha.21) (2020-11-30)

### Bug Fixes

- not reset to page 1 if query variables changed ([#256](https://github.com/sajari/sdk-react/issues/256)) ([eabda68](https://github.com/sajari/sdk-react/commit/eabda68fc5d153b424c91f646bd9170d06e7fc02))

### Features

- added error handling in Results component ([3b9bedc](https://github.com/sajari/sdk-react/commit/3b9bedcd856b3b34413c8f52bb9f10f67788916c))

# [1.0.0-alpha.20](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.19...@sajari/react-hooks@1.0.0-alpha.20) (2020-11-27)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-alpha.19](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.18...@sajari/react-hooks@1.0.0-alpha.19) (2020-11-27)

### Features

- allow blocking a field being mapped by passing false ([db644ba](https://github.com/sajari/sdk-react/commit/db644ba5a4306bd39ef4e0a89c49227312a62508))

# [1.0.0-alpha.18](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.17...@sajari/react-hooks@1.0.0-alpha.18) (2020-11-26)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-alpha.17](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.16...@sajari/react-hooks@1.0.0-alpha.17) (2020-11-26)

### Bug Fixes

- one reference to project missed ([bd58251](https://github.com/sajari/sdk-react/commit/bd5825158f9882db3bb3a7f3a58487d2574fe815))

# [1.0.0-alpha.16](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.15...@sajari/react-hooks@1.0.0-alpha.16) (2020-11-26)

### Bug Fixes

- resolve issue with single quotes in filter value ([5e0dc2a](https://github.com/sajari/sdk-react/commit/5e0dc2ac96f31bf244eb3fc024007bc258667902))

# [1.0.0-alpha.15](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.14...@sajari/react-hooks@1.0.0-alpha.15) (2020-11-26)

### Bug Fixes

- resolved issue with commas in filter values ([6c8cea2](https://github.com/sajari/sdk-react/commit/6c8cea2bba0feb1b0a0bd4ba29db81c30162eb8f))

# [1.0.0-alpha.14](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.13...@sajari/react-hooks@1.0.0-alpha.14) (2020-11-26)

### Features

- don’t require variables to be set (nicer DX) ([f95fb3c](https://github.com/sajari/sdk-react/commit/f95fb3c4293bfbf540a3158d8a6d0ebfe8768858))

# [1.0.0-alpha.13](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.12...@sajari/react-hooks@1.0.0-alpha.13) (2020-11-26)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-alpha.12](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.11...@sajari/react-hooks@1.0.0-alpha.12) (2020-11-26)

### Bug Fixes

- variables filter syntax error ([519523f](https://github.com/sajari/sdk-react/commit/519523f3aa797c93cb7815b3b90a4df50d05d4fe))
- variables filter syntax error ([cbc0c87](https://github.com/sajari/sdk-react/commit/cbc0c878c051b29574043b36a56a2567abcecd0d))

# [1.0.0-alpha.11](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.10...@sajari/react-hooks@1.0.0-alpha.11) (2020-11-26)

### Bug Fixes

- searchOnLoad ([#247](https://github.com/sajari/sdk-react/issues/247)) ([00ab34b](https://github.com/sajari/sdk-react/commit/00ab34b3b5f1f05b42b13914c28ef99f97586af8))
- useSearch ([#246](https://github.com/sajari/sdk-react/issues/246)) ([0ae10a2](https://github.com/sajari/sdk-react/commit/0ae10a2c66f2fffab3c977bb3291ff69178bf684))

# [1.0.0-alpha.10](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.9...@sajari/react-hooks@1.0.0-alpha.10) (2020-11-25)

### Bug Fixes

- default subtitle to url for website collections ([a06c2d0](https://github.com/sajari/sdk-react/commit/a06c2d0e44aa6f4853bfa9d327215ae992bd853b))

# [1.0.0-alpha.9](https://github.com/sajari/sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.8...@sajari/react-hooks@1.0.0-alpha.9) (2020-11-24)

### Bug Fixes

- searching state ([#243](https://github.com/sajari/sdk-react/issues/243)) ([c351932](https://github.com/sajari/sdk-react/commit/c351932a00c89da0552521960a8109b6fbbbf213))

# [1.0.0-alpha.8](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.7...@sajari/react-hooks@1.0.0-alpha.8) (2020-11-20)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-alpha.7](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.6...@sajari/react-hooks@1.0.0-alpha.7) (2020-11-18)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-alpha.6](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.5...@sajari/react-hooks@1.0.0-alpha.6) (2020-11-17)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-alpha.5](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.4...@sajari/react-hooks@1.0.0-alpha.5) (2020-11-17)

**Note:** Version bump only for package @sajari/react-hooks

# [1.0.0-alpha.4](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.3...@sajari/react-hooks@1.0.0-alpha.4) (2020-11-17)

### Features

- expose searching flag in useSearchContext ([d4c4b77](https://github.com/sajari/sajari-sdk-react/commit/d4c4b776e09a23bc2e6a68e28042c9607c626c5e))

# [1.0.0-alpha.3](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.2...@sajari/react-hooks@1.0.0-alpha.3) (2020-11-17)

### Features

- updated props for Filter component ([#227](https://github.com/sajari/sajari-sdk-react/issues/227)) ([b44e7f2](https://github.com/sajari/sajari-sdk-react/commit/b44e7f294fa64033bdc04bd8a0414387e2b702ea))

# [1.0.0-alpha.2](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-hooks@1.0.0-alpha.1...@sajari/react-hooks@1.0.0-alpha.2) (2020-11-16)

### Bug Fixes

- pass through Results props to Result ([1ea7458](https://github.com/sajari/sajari-sdk-react/commit/1ea7458bcfaf90f3e9392d51c260941451bb42bf))
- performance ([#222](https://github.com/sajari/sajari-sdk-react/issues/222)) ([480eabd](https://github.com/sajari/sajari-sdk-react/commit/480eabd4d21cc123a5156b7aa54cf46c4db0eaa2))
- search function in useSearch ([#223](https://github.com/sajari/sajari-sdk-react/issues/223)) ([594ae3a](https://github.com/sajari/sajari-sdk-react/commit/594ae3a8ea502ecdb71be027f98f5603e02bf51d))
