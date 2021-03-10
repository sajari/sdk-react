# Change Log

## 1.8.2

### Patch Changes

- [`a92d7237`](https://github.com/sajari/sdk-react/commit/a92d7237115c74f5217a60a946ddc182901cba79) [#437](https://github.com/sajari/sdk-react/pull/437) Thanks [@tuanddd](https://github.com/tuanddd)! - Allow onSelect prop on Input component

## 1.8.1

### Patch Changes

- [`5e91e79f`](https://github.com/sajari/sdk-react/commit/5e91e79fc15e9a2ab88b079c72eb44902f33d56c) [#430](https://github.com/sajari/sdk-react/pull/430) Thanks [@tuanddd](https://github.com/tuanddd)! - Add relative position to input in attach mode

- Updated dependencies [[`5e91e79f`](https://github.com/sajari/sdk-react/commit/5e91e79fc15e9a2ab88b079c72eb44902f33d56c)]:
  - @sajari/react-components@1.6.1

## 1.8.0

### Minor Changes

- [`2f7d7ec1`](https://github.com/sajari/sdk-react/commit/2f7d7ec132d31e9accf12acc790f08b4bf2ec4f9) [#380](https://github.com/sajari/sdk-react/pull/380) Thanks [@tuanddd](https://github.com/tuanddd)! - Add ability for Input to render with an existing input element

### Patch Changes

- [`b14aa3d1`](https://github.com/sajari/sdk-react/commit/b14aa3d13afd545186e7fd0a1758c8badb3de65c) [#425](https://github.com/sajari/sdk-react/pull/425) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Added support `frozen` state for `RangeFilterBuilder`. If `frozen` is `true`, blocking any update for `min`, `max` or `range`.

- Updated dependencies [[`2f7d7ec1`](https://github.com/sajari/sdk-react/commit/2f7d7ec132d31e9accf12acc790f08b4bf2ec4f9), [`b14aa3d1`](https://github.com/sajari/sdk-react/commit/b14aa3d13afd545186e7fd0a1758c8badb3de65c)]:
  - @sajari/react-components@1.6.0
  - @sajari/react-hooks@1.4.9

## 1.7.24

### Patch Changes

- [`9aabd85c`](https://github.com/sajari/sdk-react/commit/9aabd85c0a6ba2af097f796efce349ae91e12fa3) [#423](https://github.com/sajari/sdk-react/pull/423) Thanks [@tuanddd](https://github.com/tuanddd)! - Fix stale ratio and object-fit value

## 1.7.23

### Patch Changes

- [`c374223e`](https://github.com/sajari/sdk-react/commit/c374223e67fd75fc9a4810fbb4e46a1872d8bd26) [#421](https://github.com/sajari/sdk-react/pull/421) Thanks [@sampotts](https://github.com/sampotts)! - Improved types for RangeInput component

- Updated dependencies [[`c374223e`](https://github.com/sajari/sdk-react/commit/c374223e67fd75fc9a4810fbb4e46a1872d8bd26)]:
  - @sajari/react-components@1.5.15

## 1.7.22

### Patch Changes

- [`3712d27a`](https://github.com/sajari/sdk-react/commit/3712d27a55cd764de79abdd5ee80854b2af7a9d8) [#417](https://github.com/sajari/sdk-react/pull/417) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed the issue of incorrect response after using filters. It was caused by the `filter()` method of a count aggregate filter will ignore the value that is not in the options.

* [`20a8a4e8`](https://github.com/sajari/sdk-react/commit/20a8a4e89fd812c6d3a8c8f68cc6797ac72d9bd2) [#420](https://github.com/sajari/sdk-react/pull/420) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed the issue when using the range filter will sometimes cause mismatches between the UI and the response. Previously, the attempt was to retain the previous range values once a new request was made, but it is tricky and often leads to the issues mentioned earlier. The change aims to simplify the logic:

  - Only update the `min` and `max` from the response if the query was changed.
  - Once the `min` and `max` changed, set the range to `[min, max]`.

- [`5b4cb350`](https://github.com/sajari/sdk-react/commit/5b4cb3506e48e3d9cc668c9134e170fff4c3cd64) [#419](https://github.com/sajari/sdk-react/pull/419) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed tabs are unclickable because the ref DOM node from `cloneElement` sometimes gets `null`.

- Updated dependencies [[`3712d27a`](https://github.com/sajari/sdk-react/commit/3712d27a55cd764de79abdd5ee80854b2af7a9d8), [`20a8a4e8`](https://github.com/sajari/sdk-react/commit/20a8a4e89fd812c6d3a8c8f68cc6797ac72d9bd2), [`5b4cb350`](https://github.com/sajari/sdk-react/commit/5b4cb3506e48e3d9cc668c9134e170fff4c3cd64)]:
  - @sajari/react-hooks@1.4.8
  - @sajari/react-components@1.5.14

## 1.7.21

### Patch Changes

- [`d2636fdb`](https://github.com/sajari/sdk-react/commit/d2636fdb70112366fc40ffd207cb5d44c6786b3d) [#415](https://github.com/sajari/sdk-react/pull/415) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed incorrrect summary message where the query is disabled.

* [`ab41772c`](https://github.com/sajari/sdk-react/commit/ab41772c15cd81a02de0aa6bcb2cccb45e93765f) [#414](https://github.com/sajari/sdk-react/pull/414) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed cursor jumps to end of input when typing mid query.

* Updated dependencies [[`ab41772c`](https://github.com/sajari/sdk-react/commit/ab41772c15cd81a02de0aa6bcb2cccb45e93765f)]:
  - @sajari/react-components@1.5.13

## 1.7.20

### Patch Changes

- [`9177b595`](https://github.com/sajari/sdk-react/commit/9177b595981e4a8c72eabfde22e45c6cb2260dae) [#410](https://github.com/sajari/sdk-react/pull/410) Thanks [@tuanddd](https://github.com/tuanddd)! - Fix a bug where Swatch component shows unavailable colors

- Updated dependencies [[`0662ebcb`](https://github.com/sajari/sdk-react/commit/0662ebcb580635607db02eb5f766b182ad42a673), [`63bf8f68`](https://github.com/sajari/sdk-react/commit/63bf8f6838b9d1f61bcc593740309bc3f4b02246)]:
  - @sajari/react-hooks@1.4.7
  - @sajari/react-components@1.5.12

## 1.7.19

### Patch Changes

- [`56de65d5`](https://github.com/sajari/sdk-react/commit/56de65d5266b4479bdaef982837320b2fc9ecc27) [#408](https://github.com/sajari/sdk-react/pull/408) Thanks [@sampotts](https://github.com/sampotts)! - Add support (max|min)-aggregate-filter in RangeInput

- Updated dependencies [[`56de65d5`](https://github.com/sajari/sdk-react/commit/56de65d5266b4479bdaef982837320b2fc9ecc27)]:
  - @sajari/react-hooks@1.4.6

## 1.7.18

### Patch Changes

- [`fe173760`](https://github.com/sajari/sdk-react/commit/fe173760730baf7b04502a30909f0330ea27e300) [#406](https://github.com/sajari/sdk-react/pull/406) Thanks [@sampotts](https://github.com/sampotts)! - Fix merge without options specified

- Updated dependencies [[`fe173760`](https://github.com/sajari/sdk-react/commit/fe173760730baf7b04502a30909f0330ea27e300)]:
  - @sajari/react-sdk-utils@1.3.8
  - @sajari/react-components@1.5.11

## 1.7.17

### Patch Changes

- [`896c5946`](https://github.com/sajari/sdk-react/commit/896c59461dca61da835b3925a758cb7a3fa49fb2) [#404](https://github.com/sajari/sdk-react/pull/404) Thanks [@sampotts](https://github.com/sampotts)! - Fix Firefox overflow ignoring bottom padding

* [`896c5946`](https://github.com/sajari/sdk-react/commit/896c59461dca61da835b3925a758cb7a3fa49fb2) [#404](https://github.com/sajari/sdk-react/pull/404) Thanks [@sampotts](https://github.com/sampotts)! - Fix overflow issue on Select component

* Updated dependencies [[`896c5946`](https://github.com/sajari/sdk-react/commit/896c59461dca61da835b3925a758cb7a3fa49fb2), [`896c5946`](https://github.com/sajari/sdk-react/commit/896c59461dca61da835b3925a758cb7a3fa49fb2)]:
  - @sajari/react-components@1.5.10

## 1.7.16

### Patch Changes

- [`59c28459`](https://github.com/sajari/sdk-react/commit/59c284590bf095f63ef15a77133458fbfa8f16bf) [#402](https://github.com/sajari/sdk-react/pull/402) Thanks [@sampotts](https://github.com/sampotts)! - Fix overflow issue on Select component

- Updated dependencies [[`59c28459`](https://github.com/sajari/sdk-react/commit/59c284590bf095f63ef15a77133458fbfa8f16bf)]:
  - @sajari/react-components@1.5.9

## 1.7.15

### Patch Changes

- [`7b235cb3`](https://github.com/sajari/sdk-react/commit/7b235cb3171abb704c73bf0ba03f3918a4b33753) [#400](https://github.com/sajari/sdk-react/pull/400) Thanks [@sampotts](https://github.com/sampotts)! - Fix styling of RangeInput handle tooltip

- Updated dependencies [[`7b235cb3`](https://github.com/sajari/sdk-react/commit/7b235cb3171abb704c73bf0ba03f3918a4b33753)]:
  - @sajari/react-components@1.5.8

## 1.7.14

### Patch Changes

- [`855c808e`](https://github.com/sajari/sdk-react/commit/855c808e9a0bc267de9d3cccea1db3f5cc45068f) [#394](https://github.com/sajari/sdk-react/pull/394) Thanks [@sampotts](https://github.com/sampotts)! - Improved usability of the RangeInput component

- Updated dependencies [[`db0eddf5`](https://github.com/sajari/sdk-react/commit/db0eddf50a786cbe2973dbb3185d7efa21abcb01), [`855c808e`](https://github.com/sajari/sdk-react/commit/855c808e9a0bc267de9d3cccea1db3f5cc45068f)]:
  - @sajari/react-sdk-utils@1.3.6
  - @sajari/react-components@1.5.7

## 1.7.13

### Patch Changes

- [`d9cead04`](https://github.com/sajari/sdk-react/commit/d9cead045105086778f851c093d60bcb56fdca0b) [#392](https://github.com/sajari/sdk-react/pull/392) Thanks [@sampotts](https://github.com/sampotts)! - Add support for SpeechRecognition (unprefixed)

- Updated dependencies [[`d9cead04`](https://github.com/sajari/sdk-react/commit/d9cead045105086778f851c093d60bcb56fdca0b)]:
  - @sajari/react-components@1.5.6

## 1.7.12

### Patch Changes

- [`20b35922`](https://github.com/sajari/sdk-react/commit/20b35922f07512c9b4581c25a5d71941cb465010) [#388](https://github.com/sajari/sdk-react/pull/388) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed components depend on ThemeProvider wrapper to be able to work.

- Updated dependencies [[`21c0324b`](https://github.com/sajari/sdk-react/commit/21c0324b6771738505de6ad0e66ecc56320c17b0), [`20b35922`](https://github.com/sajari/sdk-react/commit/20b35922f07512c9b4581c25a5d71941cb465010)]:
  - @sajari/react-hooks@1.4.5
  - @sajari/react-components@1.5.5
  - @sajari/react-sdk-utils@1.3.5

## 1.7.11

### Patch Changes

- [`2ffbc5d9`](https://github.com/sajari/sdk-react/commit/2ffbc5d9dc9de2e28413b7314b9733e65d35032a) [#385](https://github.com/sajari/sdk-react/pull/385) Thanks [@sampotts](https://github.com/sampotts)! - Package updates and minor doc updates

- Updated dependencies [[`2ffbc5d9`](https://github.com/sajari/sdk-react/commit/2ffbc5d9dc9de2e28413b7314b9733e65d35032a)]:
  - @sajari/react-components@1.5.4
  - @sajari/react-hooks@1.4.4

## 1.7.10

### Patch Changes

- [`fb94f367`](https://github.com/sajari/sdk-react/commit/fb94f367c968c2185f649bad21a1914823ef4111) [#381](https://github.com/sajari/sdk-react/pull/381) Thanks [@sampotts](https://github.com/sampotts)! - Track context menu open as a click

- Updated dependencies [[`fb94f367`](https://github.com/sajari/sdk-react/commit/fb94f367c968c2185f649bad21a1914823ef4111)]:
  - @sajari/react-components@1.5.3

## 1.7.9

### Patch Changes

- [`027a5299`](https://github.com/sajari/sdk-react/commit/027a52998920fd334eb9616138a9559e2f3d569a) [#378](https://github.com/sajari/sdk-react/pull/378) Thanks [@sampotts](https://github.com/sampotts)! - Added missing react-focus-lock dependency

- Updated dependencies [[`027a5299`](https://github.com/sajari/sdk-react/commit/027a52998920fd334eb9616138a9559e2f3d569a)]:
  - @sajari/react-components@1.5.2

## 1.7.8

### Patch Changes

- [`016ab5ab`](https://github.com/sajari/sdk-react/commit/016ab5ab1bb6891127ac9d0bc5a45b9c1ee48fc6) [#376](https://github.com/sajari/sdk-react/pull/376) Thanks [@sampotts](https://github.com/sampotts)! - Add missing dependency

- Updated dependencies [[`65fd3fe2`](https://github.com/sajari/sdk-react/commit/65fd3fe2af94f27daa0d89ee9eab708e275ebbea), [`016ab5ab`](https://github.com/sajari/sdk-react/commit/016ab5ab1bb6891127ac9d0bc5a45b9c1ee48fc6)]:
  - @sajari/react-components@1.5.1
  - @sajari/react-sdk-utils@1.3.4

## 1.7.7

### Patch Changes

- [`8f1bd0e6`](https://github.com/sajari/sdk-react/commit/8f1bd0e6d197f19dca1c1af2bc2d2f1e2785d4fb) [#374](https://github.com/sajari/sdk-react/pull/374) Thanks [@sampotts](https://github.com/sampotts)! - Allow ClickTracking on non URL fields

- Updated dependencies [[`8f1bd0e6`](https://github.com/sajari/sdk-react/commit/8f1bd0e6d197f19dca1c1af2bc2d2f1e2785d4fb), [`d1af5773`](https://github.com/sajari/sdk-react/commit/d1af57738741a0600e2d15797ffff5648d1c4334)]:
  - @sajari/react-components@1.5.0
  - @sajari/react-hooks@1.4.3
  - @sajari/react-sdk-utils@1.3.3

## 1.7.6

### Patch Changes

- [`1a7007d8`](https://github.com/sajari/sdk-react/commit/1a7007d898d8915a4ea2083f1196faab8ce6f5e1) [#371](https://github.com/sajari/sdk-react/pull/371) Thanks [@sampotts](https://github.com/sampotts)! - Remove zero prices in original price

## 1.7.5

### Patch Changes

- [`3953b091`](https://github.com/sajari/sdk-react/commit/3953b091c4d4b899f570f5d6ed33bf5858eb319e) [#369](https://github.com/sajari/sdk-react/pull/369) Thanks [@sampotts](https://github.com/sampotts)! - Added support for originalPrice field

- Updated dependencies [[`3953b091`](https://github.com/sajari/sdk-react/commit/3953b091c4d4b899f570f5d6ed33bf5858eb319e)]:
  - @sajari/react-hooks@1.4.2
  - @sajari/react-sdk-utils@1.3.2

## 1.7.4

### Patch Changes

- [`8a919df2`](https://github.com/sajari/sdk-react/commit/8a919df2d07b4b5adc0c8dab61fe755a89458f60) [#367](https://github.com/sajari/sdk-react/pull/367) Thanks [@sampotts](https://github.com/sampotts)! - Fix DOMException related to querySelector syntax

- Updated dependencies [[`8a919df2`](https://github.com/sajari/sdk-react/commit/8a919df2d07b4b5adc0c8dab61fe755a89458f60)]:
  - @sajari/react-components@1.4.8

## 1.7.3

### Patch Changes

- [`70a0c40e`](https://github.com/sajari/sdk-react/commit/70a0c40e8644541521b8d5c8bc2bbb8405c79804) [#364](https://github.com/sajari/sdk-react/pull/364) Thanks [@sampotts](https://github.com/sampotts)! - Improved count styling in TabFilter

- Updated dependencies [[`70a0c40e`](https://github.com/sajari/sdk-react/commit/70a0c40e8644541521b8d5c8bc2bbb8405c79804)]:
  - @sajari/react-components@1.4.7

## 1.7.2

### Patch Changes

- [`7dcdb050`](https://github.com/sajari/sdk-react/commit/7dcdb050f1bdebac718cdb67d231d0cb4f82732d) [#362](https://github.com/sajari/sdk-react/pull/362) Thanks [@sampotts](https://github.com/sampotts)! - Set font size on Tab component

- Updated dependencies [[`7dcdb050`](https://github.com/sajari/sdk-react/commit/7dcdb050f1bdebac718cdb67d231d0cb4f82732d)]:
  - @sajari/react-components@1.4.6

## 1.7.1

### Patch Changes

- [`b52fc43b`](https://github.com/sajari/sdk-react/commit/b52fc43bd4323c96c6eef858242f6b42923f45f7) [#351](https://github.com/sajari/sdk-react/pull/351) Thanks [@tuanddd](https://github.com/tuanddd)! - Edit typing and error message

* [`85d52aa9`](https://github.com/sajari/sdk-react/commit/85d52aa91b95810ef6342b6ea9ac7f785072b1dc) [#359](https://github.com/sajari/sdk-react/pull/359) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix using `useRangeFilter` will trigger an unwanted call of `reset` method in `didMount` phase.

* Updated dependencies [[`85d52aa9`](https://github.com/sajari/sdk-react/commit/85d52aa91b95810ef6342b6ea9ac7f785072b1dc), [`fdfe9680`](https://github.com/sajari/sdk-react/commit/fdfe9680d8c79afffd51705b1687db8aae81481e)]:
  - @sajari/react-hooks@1.4.1

## 1.7.0

### Minor Changes

- [`b4157abb`](https://github.com/sajari/sdk-react/commit/b4157abb1daf7b2d2be878c7cbe66ca175db74dd) [#354](https://github.com/sajari/sdk-react/pull/354) Thanks [@tuanddd](https://github.com/tuanddd)! - add support for sorting price range

### Patch Changes

- Updated dependencies [[`b4157abb`](https://github.com/sajari/sdk-react/commit/b4157abb1daf7b2d2be878c7cbe66ca175db74dd)]:
  - @sajari/react-hooks@1.4.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.6.7](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.6.6...@sajari/react-search-ui@1.6.7) (2021-01-14)

**Note:** Version bump only for package @sajari/react-search-ui

## [1.6.3](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.6.2...@sajari/react-search-ui@1.6.3) (2021-01-12)

**Note:** Version bump only for package @sajari/react-search-ui

## [1.4.2](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.4.1...@sajari/react-search-ui@1.4.2) (2021-01-08)

**Note:** Version bump only for package @sajari/react-search-ui

## [1.4.1](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.4.0...@sajari/react-search-ui@1.4.1) (2021-01-07)

### Bug Fixes

- fix filter render lags ([ad5e161](https://github.com/sajari/sdk-react/commit/ad5e16162ba6e9f9d8650c71ec8779ed58a5cb7c))
- use currency from context in filters ([09b4446](https://github.com/sajari/sdk-react/commit/09b444676edd85a195a52ba93477446facaa2ac1))

# [1.4.0](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.3.1...@sajari/react-search-ui@1.4.0) (2021-01-06)

### Bug Fixes

- laggy filter search ([#305](https://github.com/sajari/sdk-react/issues/305)) ([9bf2667](https://github.com/sajari/sdk-react/commit/9bf2667c4e8a7e6f3b6bf9ccf707d45c19be1998))

### Features

- added image hover support to Results ([3fddbdc](https://github.com/sajari/sdk-react/commit/3fddbdc57b77fe06ce5d04a9bdbeb7e10d464ee5))

## [1.3.1](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.3.0...@sajari/react-search-ui@1.3.1) (2021-01-05)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.3.0](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.2.4...@sajari/react-search-ui@1.3.0) (2021-01-04)

### Bug Fixes

- added responsive styles to pagination ([bff3d85](https://github.com/sajari/sdk-react/commit/bff3d857bd12b20da10ed6b006f83ebaebe35728))
- fix SSR issues with Pagination ([6e2a6ab](https://github.com/sajari/sdk-react/commit/6e2a6ab9e9912de4bf6df869613a5f21dcab3693))

### Features

- expanded format option to other filters ([35f4bfe](https://github.com/sajari/sdk-react/commit/35f4bfefdc7d64b693903c88ddccf3b89086562e))

## [1.2.4](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.2.3...@sajari/react-search-ui@1.2.4) (2021-01-02)

### Bug Fixes

- collapse ListFilter when performing internal search ([7c49ac9](https://github.com/sajari/sdk-react/commit/7c49ac963ef61d69221dbf38476edc58b2dadcb2))
- truncate Select button ([88d9300](https://github.com/sajari/sdk-react/commit/88d930078bafcdc0b37d55586709901e2e6483d4))

## [1.2.3](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.2.2...@sajari/react-search-ui@1.2.3) (2021-01-01)

**Note:** Version bump only for package @sajari/react-search-ui

## [1.2.2](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.2.1...@sajari/react-search-ui@1.2.2) (2021-01-01)

### Bug Fixes

- fix searching in ListFilter ([ba52e54](https://github.com/sajari/sdk-react/commit/ba52e54edabf0fe58e8276760ef36a9d23a818f3))

## [1.2.1](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.2.0...@sajari/react-search-ui@1.2.1) (2021-01-01)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.2.0](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.1.8...@sajari/react-search-ui@1.2.0) (2020-12-31)

### Bug Fixes

- fix issues with build ([9d799ce](https://github.com/sajari/sdk-react/commit/9d799ce8b7adca31d89662652aca815bac268488))
- use shared noop function ([4d2171f](https://github.com/sajari/sdk-react/commit/4d2171fd8a7cc3a1d524d041fd46d7e2361e4833))

### Features

- new custom select and select filter type ([#304](https://github.com/sajari/sdk-react/issues/304)) ([d85db03](https://github.com/sajari/sdk-react/commit/d85db034b9ea70e9f6e1d67a783c51a3a7537ec7))

## [1.1.8](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.1.7...@sajari/react-search-ui@1.1.8) (2020-12-21)

**Note:** Version bump only for package @sajari/react-search-ui

## [1.1.7](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.1.6...@sajari/react-search-ui@1.1.7) (2020-12-21)

### Bug Fixes

- fix required name prop on Filter compositions ([c98024d](https://github.com/sajari/sdk-react/commit/c98024d563e2995a3152dd8d8083ec14c12b0f8a))

## [1.1.6](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.1.5...@sajari/react-search-ui@1.1.6) (2020-12-21)

### Bug Fixes

- fix missing exports ([e6318d0](https://github.com/sajari/sdk-react/commit/e6318d0160300e02ce2eac01c14886a6f2d7a7ad))

## [1.1.5](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.1.4...@sajari/react-search-ui@1.1.5) (2020-12-21)

### Bug Fixes

- improve accessibility of Filter ([7eda37f](https://github.com/sajari/sdk-react/commit/7eda37f040838e5ca61a519dc0082752d375efed))

## [1.1.4](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.1.3...@sajari/react-search-ui@1.1.4) (2020-12-18)

**Note:** Version bump only for package @sajari/react-search-ui

## [1.1.3](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.1.2...@sajari/react-search-ui@1.1.3) (2020-12-16)

**Note:** Version bump only for package @sajari/react-search-ui

## [1.1.2](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.1.1...@sajari/react-search-ui@1.1.2) (2020-12-15)

### Bug Fixes

- use const for languageChanged event ([338c70d](https://github.com/sajari/sdk-react/commit/338c70de5536d37bfcac5f007a1054831f73c182))

## [1.1.1](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.1.0...@sajari/react-search-ui@1.1.1) (2020-12-15)

### Bug Fixes

- cleanup i18n event listener on dismount ([747687d](https://github.com/sajari/sdk-react/commit/747687de05323f3a75e5c101e9ebfd79e179481f))

# [1.1.0](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0...@sajari/react-search-ui@1.1.0) (2020-12-15)

### Features

- localization improvements ([f7b5ea1](https://github.com/sajari/sdk-react/commit/f7b5ea168a09b218e4df8f405c28a847fc85dc18))

# 1.0.0 (2020-12-14)

### Features

- merged v3 to master ([ba23102](https://github.com/sajari/sdk-react/commit/ba231022d78013689f69767e87b152d55ece1d6a))

# [1.0.0-beta.13](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-beta.12...@sajari/react-search-ui@1.0.0-beta.13) (2020-12-14)

### Features

- export i18n ([4f9cf50](https://github.com/sajari/sdk-react/commit/4f9cf5086b775d834924cd5e5ff971eb0b1771a8))
- improved template literal parsing ([7469111](https://github.com/sajari/sdk-react/commit/74691119e52474b5a7d55d39619734eb4b489346))
- RangeInput improvements ([3d2ac31](https://github.com/sajari/sdk-react/commit/3d2ac3155f74e521bbe57d75e184dcf8e0be6bcd))
- various styling fixes ([7f41ad0](https://github.com/sajari/sdk-react/commit/7f41ad0f56be2cdf253c367312e4651fe7cf9b94))

# [1.0.0-beta.12](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-beta.11...@sajari/react-search-ui@1.0.0-beta.12) (2020-12-11)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-beta.11](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-beta.10...@sajari/react-search-ui@1.0.0-beta.11) (2020-12-10)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-beta.10](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-beta.9...@sajari/react-search-ui@1.0.0-beta.10) (2020-12-10)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-beta.9](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-beta.8...@sajari/react-search-ui@1.0.0-beta.9) (2020-12-09)

### Features

- added SSRProvider component ([8aaa2d5](https://github.com/sajari/sdk-react/commit/8aaa2d560803479c9697756322e2689c968e9a44))

# [1.0.0-beta.8](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-beta.7...@sajari/react-search-ui@1.0.0-beta.8) (2020-12-08)

### Features

- improvements to SSR support ([729dfeb](https://github.com/sajari/sdk-react/commit/729dfebc04efadbe1db297666ebec4a104208a70))

# [1.0.0-beta.7](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-beta.6...@sajari/react-search-ui@1.0.0-beta.7) (2020-12-07)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-beta.6](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-beta.5...@sajari/react-search-ui@1.0.0-beta.6) (2020-12-07)

### Bug Fixes

- don’t hide Filter when only one item ([1e61940](https://github.com/sajari/sdk-react/commit/1e6194089ccd86f5ddc9c872c9710ca789960617))
- use Box more to prevent props bleeding to DOM ([f7f6dcc](https://github.com/sajari/sdk-react/commit/f7f6dccc36244ab7f3658d378c1fb740d626f159))

# [1.0.0-beta.5](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-beta.4...@sajari/react-search-ui@1.0.0-beta.5) (2020-12-04)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-beta.4](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-beta.3...@sajari/react-search-ui@1.0.0-beta.4) (2020-12-04)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-beta.3](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-beta.2...@sajari/react-search-ui@1.0.0-beta.3) (2020-12-04)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-beta.2](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-beta.1...@sajari/react-search-ui@1.0.0-beta.2) (2020-12-04)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-beta.1](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.45...@sajari/react-search-ui@1.0.0-beta.1) (2020-12-04)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.45](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.44...@sajari/react-search-ui@1.0.0-alpha.45) (2020-12-04)

### Features

- add option to control styles for Filter ([#280](https://github.com/sajari/sdk-react/issues/280)) ([fa7d6f5](https://github.com/sajari/sdk-react/commit/fa7d6f512ff032af523c691950a1076693129e4e))

# [1.0.0-alpha.44](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.43...@sajari/react-search-ui@1.0.0-alpha.44) (2020-12-03)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.43](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.42...@sajari/react-search-ui@1.0.0-alpha.43) (2020-12-03)

### Bug Fixes

- rename ResultsPerPage sizes prop to options for consistency ([4a2b6d4](https://github.com/sajari/sdk-react/commit/4a2b6d4fd8b60b337faeb237b53c23793b73f7ef))

# [1.0.0-alpha.42](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.41...@sajari/react-search-ui@1.0.0-alpha.42) (2020-12-03)

### Bug Fixes

- slow render time in Swatch and Pagination ([#269](https://github.com/sajari/sdk-react/issues/269)) ([e3fd1b2](https://github.com/sajari/sdk-react/commit/e3fd1b299086d73c7e334341142c4f85ece44047))

# [1.0.0-alpha.41](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.40...@sajari/react-search-ui@1.0.0-alpha.41) (2020-12-03)

### Bug Fixes

- inherit fontFamily in input components ([2823134](https://github.com/sajari/sdk-react/commit/2823134617c74ee65b17d160375fe48c28a37f7c))

# [1.0.0-alpha.40](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.39...@sajari/react-search-ui@1.0.0-alpha.40) (2020-12-03)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.39](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.38...@sajari/react-search-ui@1.0.0-alpha.39) (2020-12-03)

### Bug Fixes

- fix unwanted props leaking to the DOM ([0ad76bc](https://github.com/sajari/sdk-react/commit/0ad76bc8deddd499cc5687dfb0ca2686af3b2b22))
- summary disable suggestion by default ([#273](https://github.com/sajari/sdk-react/issues/273)) ([7c448b8](https://github.com/sajari/sdk-react/commit/7c448b850d185b8af9616f8536c5b101ba250c0d))

### Features

- add option to control styles for Combobox and Input ([#275](https://github.com/sajari/sdk-react/issues/275)) ([2772197](https://github.com/sajari/sdk-react/commit/2772197939c51f4e71990bb5255fbcbde2c75950))

# [1.0.0-alpha.38](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.37...@sajari/react-search-ui@1.0.0-alpha.38) (2020-12-02)

### Bug Fixes

- don’t export useSearchContext from search-ui ([6d4ff49](https://github.com/sajari/sdk-react/commit/6d4ff497cae2cb19b78a5dc1b7498cddd691ad84))

# [1.0.0-alpha.37](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.36...@sajari/react-search-ui@1.0.0-alpha.37) (2020-12-02)

### Bug Fixes

- resolve duplicate exports ([0cb64f1](https://github.com/sajari/sdk-react/commit/0cb64f1419ebab91dc9b18df4e4c83cb8bebc709))

# [1.0.0-alpha.36](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.35...@sajari/react-search-ui@1.0.0-alpha.36) (2020-12-02)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.35](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.34...@sajari/react-search-ui@1.0.0-alpha.35) (2020-12-02)

### Bug Fixes

- add missing LiveAccouncer context ([08a9fa4](https://github.com/sajari/sdk-react/commit/08a9fa4638da59499f388f5d5f1f49fe8f325685))
- don’t render if filter has one option ([42e0c65](https://github.com/sajari/sdk-react/commit/42e0c65fc1a10638dd2d2cd20966148bf88f0cfd))
- show loader when loading first search ([fd1366d](https://github.com/sajari/sdk-react/commit/fd1366d3ab0e489ceeeb632d30c056cf3695913c))
- show PageSize while loading ([cbcf70b](https://github.com/sajari/sdk-react/commit/cbcf70b439042e182474dad30dc5fdd96c893aa7))

### Features

- add option to control styles for Results ([#265](https://github.com/sajari/sdk-react/issues/265)) ([1757068](https://github.com/sajari/sdk-react/commit/1757068736045209c26ce68e781f03c2772abc50))
- design tweaks to view options ([d19202c](https://github.com/sajari/sdk-react/commit/d19202ce37082d03931f4733e2d70f9fb65c116c))
- don’t render view options until initial search completed ([342abe3](https://github.com/sajari/sdk-react/commit/342abe3fa06e0f3167aa53746d8a9d48b190b9a8))

# [1.0.0-alpha.34](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.33...@sajari/react-search-ui@1.0.0-alpha.34) (2020-12-01)

### Features

- add option to control styles for PageSize ([#261](https://github.com/sajari/sdk-react/issues/261)) ([8fe8379](https://github.com/sajari/sdk-react/commit/8fe83797649ce4d45b5c5407e8886ff61e0a8662))
- add option to control styles for Sorting ([#262](https://github.com/sajari/sdk-react/issues/262)) ([19bf28c](https://github.com/sajari/sdk-react/commit/19bf28c82a494c3d96235176396b097f3e927faa))
- add option to control styles for ViewType ([#260](https://github.com/sajari/sdk-react/issues/260)) ([85cb234](https://github.com/sajari/sdk-react/commit/85cb2340c2014cb72815d7b6787aa3d10282b571))

# [1.0.0-alpha.33](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.32...@sajari/react-search-ui@1.0.0-alpha.33) (2020-12-01)

### Features

- add option to control styling of components ([#248](https://github.com/sajari/sdk-react/issues/248)) ([fbc1114](https://github.com/sajari/sdk-react/commit/fbc1114399dfefaa48d215ba628da55130915b6b))
- added TabFilter component ([#259](https://github.com/sajari/sdk-react/issues/259)) ([d19ccc7](https://github.com/sajari/sdk-react/commit/d19ccc76aebac7a26ee9386c72d4959d5d0b360e))

# [1.0.0-alpha.32](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.31...@sajari/react-search-ui@1.0.0-alpha.32) (2020-11-30)

### Bug Fixes

- remove redundant styles ([24e3faa](https://github.com/sajari/sdk-react/commit/24e3faaa0f8194ecdb29f7c674674ab5bd8e6911))
- revert types change for Results ([5d6b5d2](https://github.com/sajari/sdk-react/commit/5d6b5d268ab9a688777efcb49aecd23c1ebebbc4))

### Features

- added error handling in Results component ([3b9bedc](https://github.com/sajari/sdk-react/commit/3b9bedcd856b3b34413c8f52bb9f10f67788916c))
- added i18n support ([9a977b2](https://github.com/sajari/sdk-react/commit/9a977b29d9f430686523bf65e54e5fb5921dce51))

# [1.0.0-alpha.31](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.30...@sajari/react-search-ui@1.0.0-alpha.31) (2020-11-27)

### Bug Fixes

- remove fontSize specification on PageSize and ViewType ([5e3b6ad](https://github.com/sajari/sdk-react/commit/5e3b6adecd3daf0e3f74bba1899d3896dc385ed2))

# [1.0.0-alpha.30](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.29...@sajari/react-search-ui@1.0.0-alpha.30) (2020-11-27)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.29](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.28...@sajari/react-search-ui@1.0.0-alpha.29) (2020-11-27)

### Bug Fixes

- use CSS for uppercase ([83cafa6](https://github.com/sajari/sdk-react/commit/83cafa654e80084d3198160cdb155863bb5a51bb))

### Features

- add forceImage prop to always render an image placeholder ([8f8f5dc](https://github.com/sajari/sdk-react/commit/8f8f5dc79918fbe7d4b4c57da30d64fe937cddb5))
- allow independent aspectRatio and objectFit props on Results ([7900493](https://github.com/sajari/sdk-react/commit/79004930cde3b403d52917c50e94d92aca47e98e))

# [1.0.0-alpha.28](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.27...@sajari/react-search-ui@1.0.0-alpha.28) (2020-11-26)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.27](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.26...@sajari/react-search-ui@1.0.0-alpha.27) (2020-11-26)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.26](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.25...@sajari/react-search-ui@1.0.0-alpha.26) (2020-11-26)

### Bug Fixes

- wrong use of Input component in Filter ([#252](https://github.com/sajari/sdk-react/issues/252)) ([d8cf55a](https://github.com/sajari/sdk-react/commit/d8cf55a91039bfc0077eeb65fc7d0f5127f9dfcd))

### Features

- add rating filter ([#253](https://github.com/sajari/sdk-react/issues/253)) ([3ea1dd8](https://github.com/sajari/sdk-react/commit/3ea1dd8417b034421a5d33781a190f09aaba8c91))
- only pinSelected if item count is over limit ([33ded9a](https://github.com/sajari/sdk-react/commit/33ded9a50465af2c0a273b821a15bc879a980638))

# [1.0.0-alpha.25](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.24...@sajari/react-search-ui@1.0.0-alpha.25) (2020-11-26)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.24](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.23...@sajari/react-search-ui@1.0.0-alpha.24) (2020-11-26)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.23](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.22...@sajari/react-search-ui@1.0.0-alpha.23) (2020-11-26)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.22](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.21...@sajari/react-search-ui@1.0.0-alpha.22) (2020-11-26)

### Bug Fixes

- hide PageSize when not required ([2042bc2](https://github.com/sajari/sdk-react/commit/2042bc27bc9846b3e5b8b086e6683cc08740eeb4))
- remove flash of single column in grid view ([87ac010](https://github.com/sajari/sdk-react/commit/87ac0107134d00a8c7e9e1ae2a410eaa796350be))

# [1.0.0-alpha.21](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.20...@sajari/react-search-ui@1.0.0-alpha.21) (2020-11-26)

### Bug Fixes

- results appearance ([#249](https://github.com/sajari/sdk-react/issues/249)) ([ceef5b0](https://github.com/sajari/sdk-react/commit/ceef5b0cfc71635b4a4b090abaffc20ab4a6f880))

# [1.0.0-alpha.20](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.19...@sajari/react-search-ui@1.0.0-alpha.20) (2020-11-26)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.19](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.18...@sajari/react-search-ui@1.0.0-alpha.19) (2020-11-26)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.18](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.17...@sajari/react-search-ui@1.0.0-alpha.18) (2020-11-26)

### Bug Fixes

- styling updates ([83bca31](https://github.com/sajari/sdk-react/commit/83bca31c4b88d4ea565b1fbf0d1b5625a5d0ce27))

### Features

- added size options for view option components ([ccef487](https://github.com/sajari/sdk-react/commit/ccef487a60374d35ea5e4a08278a5d1334f5f305))

# [1.0.0-alpha.17](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.16...@sajari/react-search-ui@1.0.0-alpha.17) (2020-11-26)

### Bug Fixes

- erronous reference to loading ([c71dcca](https://github.com/sajari/sdk-react/commit/c71dcca3f908c94815d82a5518843ce219c2f14d))

# [1.0.0-alpha.16](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.15...@sajari/react-search-ui@1.0.0-alpha.16) (2020-11-25)

### Bug Fixes

- more styling fixes ([bd4d00d](https://github.com/sajari/sdk-react/commit/bd4d00de6dd42066b3751d4cf3c90c41239286a8))

# [1.0.0-alpha.15](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.14...@sajari/react-search-ui@1.0.0-alpha.15) (2020-11-25)

### Bug Fixes

- minor styling fixes ([aced6a4](https://github.com/sajari/sdk-react/commit/aced6a4247633fa982c90881a9d6b4bbbca34ecb))
- results grid view ([#245](https://github.com/sajari/sdk-react/issues/245)) ([40b6ac5](https://github.com/sajari/sdk-react/commit/40b6ac54adceb078017c53b7265c83a84a5852a7))

# [1.0.0-alpha.14](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.13...@sajari/react-search-ui@1.0.0-alpha.14) (2020-11-25)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.13](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.12...@sajari/react-search-ui@1.0.0-alpha.13) (2020-11-25)

### Features

- handle loading and no results in Results component ([2610a1a](https://github.com/sajari/sdk-react/commit/2610a1ad6c6da97ed7083b45a99eb294c1ff4554))
- show loader in input when searching or autocompleting ([923d5a5](https://github.com/sajari/sdk-react/commit/923d5a51510e6a9b79bb4ee30a71b6edc05ef7fe))

# [1.0.0-alpha.12](https://github.com/sajari/sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.11...@sajari/react-search-ui@1.0.0-alpha.12) (2020-11-24)

### Features

- results styling improvements ([ab89200](https://github.com/sajari/sdk-react/commit/ab89200e690e1b3cc078a3628079b6d3f416a7f6))

# [1.0.0-alpha.11](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.10...@sajari/react-search-ui@1.0.0-alpha.11) (2020-11-20)

### Bug Fixes

- image styles in list view ([e8a1149](https://github.com/sajari/sajari-sdk-react/commit/e8a114991c7c8a0d0abb07546d2fccb507278848))

# [1.0.0-alpha.10](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.9...@sajari/react-search-ui@1.0.0-alpha.10) (2020-11-18)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.9](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.8...@sajari/react-search-ui@1.0.0-alpha.9) (2020-11-18)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.8](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.7...@sajari/react-search-ui@1.0.0-alpha.8) (2020-11-18)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.7](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.6...@sajari/react-search-ui@1.0.0-alpha.7) (2020-11-17)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.6](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.5...@sajari/react-search-ui@1.0.0-alpha.6) (2020-11-17)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.5](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.4...@sajari/react-search-ui@1.0.0-alpha.5) (2020-11-17)

**Note:** Version bump only for package @sajari/react-search-ui

# [1.0.0-alpha.4](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.3...@sajari/react-search-ui@1.0.0-alpha.4) (2020-11-17)

### Features

- updated props for Filter component ([#227](https://github.com/sajari/sajari-sdk-react/issues/227)) ([b44e7f2](https://github.com/sajari/sajari-sdk-react/commit/b44e7f294fa64033bdc04bd8a0414387e2b702ea))

# [1.0.0-alpha.3](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-search-ui@1.0.0-alpha.2...@sajari/react-search-ui@1.0.0-alpha.3) (2020-11-16)

### Bug Fixes

- pass through Results props to Result ([1ea7458](https://github.com/sajari/sajari-sdk-react/commit/1ea7458bcfaf90f3e9392d51c260941451bb42bf))
- performance ([#222](https://github.com/sajari/sajari-sdk-react/issues/222)) ([480eabd](https://github.com/sajari/sajari-sdk-react/commit/480eabd4d21cc123a5156b7aa54cf46c4db0eaa2))
