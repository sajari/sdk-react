# Change Log

## 1.6.4

### Patch Changes

- [`8e2c6a08`](https://github.com/sajari/sdk-react/commit/8e2c6a081431b697d23cf99ca219da1dee79acc7) [#768](https://github.com/sajari/sdk-react/pull/768) Thanks [@JasonBerry](https://github.com/JasonBerry)! - Correct React peer dependency versioning

## 1.6.3

### Patch Changes

- [`7bfe133e`](https://github.com/sajari/sdk-react/commit/7bfe133e63c2a882f25f350527ccb58d78ccb632) [#686](https://github.com/sajari/sdk-react/pull/686) Thanks [@wwalser](https://github.com/wwalser)! - fix: encoding of entities in empty result message

## 1.6.2

### Patch Changes

- [`1069d938`](https://github.com/sajari/sdk-react/commit/1069d93883c998d7b10129565cb0d915d7d99b08) [#684](https://github.com/sajari/sdk-react/pull/684) Thanks [@wwalser](https://github.com/wwalser)! - fix: bug fix for handling of redirect returned in autocomplete pipelines

## 1.6.1

### Patch Changes

- [`506677e7`](https://github.com/sajari/sdk-react/commit/506677e75e93f24f39641b84d82ee558bed1483f) [#682](https://github.com/sajari/sdk-react/pull/682) Thanks [@wwalser](https://github.com/wwalser)! - feat: better handling of redirects

## 1.6.0

### Minor Changes

- [`dcd39d99`](https://github.com/sajari/sdk-react/commit/dcd39d99115d3eae5cb375a8f2b2480eff2348a1) [#680](https://github.com/sajari/sdk-react/pull/680) Thanks [@wwalser](https://github.com/wwalser)! - feat: implement redirects across all relevant components

## 1.5.0

### Minor Changes

- [`bf1d17b9`](https://github.com/sajari/sdk-react/commit/bf1d17b9bc45e7b5e3d4617eee7c8cae086620fe) [#597](https://github.com/sajari/sdk-react/pull/597) Thanks [@tuanddd](https://github.com/tuanddd)! - Add support for features of Result component to result template

## 1.4.3

### Patch Changes

- [`d188470b`](https://github.com/sajari/sdk-react/commit/d188470be4a4032aa2c5d5efb1d2a8950908f011) [#628](https://github.com/sajari/sdk-react/pull/628) Thanks [@wwalser](https://github.com/wwalser)! - chore: try again for IE11 support

## 1.4.2

### Patch Changes

- [`3f356101`](https://github.com/sajari/sdk-react/commit/3f356101500955f3e7da50e8548696ca60e904f6) [#624](https://github.com/sajari/sdk-react/pull/624) Thanks [@wwalser](https://github.com/wwalser)! - chore: ie11 support by working around lack of toString.call

## 1.4.1

### Patch Changes

- [`16192d33`](https://github.com/sajari/sdk-react/commit/16192d3307471979abcd000d26141ebdbe710be6) [#607](https://github.com/sajari/sdk-react/pull/607) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix missing setting key for emotion cache which causes a warning if an app requires using multiple emotion caches.

## 1.4.0

### Minor Changes

- [`efbe9275`](https://github.com/sajari/sdk-react/commit/efbe927579a935489e5ee8c7f35db35293ea96aa) [#598](https://github.com/sajari/sdk-react/pull/598) Thanks [@huygn](https://github.com/huygn)! - Change Tailwind's units to EM instead of REM

### Patch Changes

- [`c803bd4c`](https://github.com/sajari/sdk-react/commit/c803bd4c5d7a5eed7372811df13852556755392f) [#602](https://github.com/sajari/sdk-react/pull/602) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Apply new Tailwind config to support `em` instead of `rem` for component packages.

## 1.3.17

### Patch Changes

- [`5fb0a7f0`](https://github.com/sajari/sdk-react/commit/5fb0a7f0008f7b96a6257c6d35cb41ba1496ec2c) [#583](https://github.com/sajari/sdk-react/pull/583) Thanks [@wwalser](https://github.com/wwalser)! - chore: slight code quality problem missed in code review

## 1.3.16

### Patch Changes

- [`dd9a8790`](https://github.com/sajari/sdk-react/commit/dd9a8790bd763246b754ec016ffce2ddfccfebb6) [#581](https://github.com/sajari/sdk-react/pull/581) Thanks [@wwalser](https://github.com/wwalser)! - feat: support custom clicktracking url so we can test in non-prod environments

## 1.3.15

### Patch Changes

- [`6f34914a`](https://github.com/sajari/sdk-react/commit/6f34914ae92f850f7009bbbbb2c661217deaf632) [#580](https://github.com/sajari/sdk-react/pull/580) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix the issue when the footer of the modal gets hidden on iPad. It was because we used `vh` to limit the max height of the modal content but on mobile browsers, the bottom bar is not part the the `100vh` height so the bottom UI will be cut off when the address bar is visible. For more details, see https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html.

* [`995c5117`](https://github.com/sajari/sdk-react/commit/995c5117e9a053a79dc6638b02243b60b155a6ae) [#576](https://github.com/sajari/sdk-react/pull/576) Thanks [@wwalser](https://github.com/wwalser)! - Updated dependencies in order to create a more reliable build. This should have no runtime side effects but because it alters dependencies it felt best to do a patch version bump.

## 1.3.14

### Patch Changes

- [`4339ec8a`](https://github.com/sajari/sdk-react/commit/4339ec8a54cfabd154def5391adbdf23e77342be) [#567](https://github.com/sajari/sdk-react/pull/567) Thanks [@tuanddd](https://github.com/tuanddd)! - Fix a bug where clicking in the RangeInput does not update with the right value

## 1.3.13

### Patch Changes

- [`218e3702`](https://github.com/sajari/sdk-react/commit/218e3702c53dffc0db71697b9606e341177522d8) [#558](https://github.com/sajari/sdk-react/pull/558) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix the reset button on a list filter doesn't show correctly.

## 1.3.12

### Patch Changes

- [`8c1991b5`](https://github.com/sajari/sdk-react/commit/8c1991b5aa0fe441d69c5fe6906bb44dfcf0df6b) [#546](https://github.com/sajari/sdk-react/pull/546) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix missing `arraysEqual` in `@sajari/react-sdk-utils` package.

## 1.3.11

### Patch Changes

- [`02d86a64`](https://github.com/sajari/sdk-react/commit/02d86a64b7631744d59c06094187c62088caed40) [#526](https://github.com/sajari/sdk-react/pull/526) Thanks [@tuanddd](https://github.com/tuanddd)! - Return empty if price not found

## 1.3.10

### Patch Changes

- [`8c9c758f`](https://github.com/sajari/sdk-react/commit/8c9c758fc563494f91ef28f323c5fd2edf84359d) [#507](https://github.com/sajari/sdk-react/pull/507) Thanks [@tuanddd](https://github.com/tuanddd)! - Add maxium z-index value

## 1.3.9

### Patch Changes

- [`02df4b46`](https://github.com/sajari/sdk-react/commit/02df4b46489ab8fced39ac380890ee48d8a6a7cb) [#454](https://github.com/sajari/sdk-react/pull/454) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Increase the `z-index` value of `Modal` to 10000 to somewhat avoid it being overlapped by other elements.

## 1.3.8

### Patch Changes

- [`fe173760`](https://github.com/sajari/sdk-react/commit/fe173760730baf7b04502a30909f0330ea27e300) [#406](https://github.com/sajari/sdk-react/pull/406) Thanks [@sampotts](https://github.com/sampotts)! - Fix merge without options specified

## 1.3.7

### Patch Changes

- [`4f20ee15`](https://github.com/sajari/sdk-react/commit/4f20ee15a0de886e237f2adee081250ed7b7b805) [#398](https://github.com/sajari/sdk-react/pull/398) Thanks [@sampotts](https://github.com/sampotts)! - Improved object checking in merge util to better support complex objects

## 1.3.6

### Patch Changes

- [`db0eddf5`](https://github.com/sajari/sdk-react/commit/db0eddf50a786cbe2973dbb3185d7efa21abcb01) [#396](https://github.com/sajari/sdk-react/pull/396) Thanks [@sampotts](https://github.com/sampotts)! - Added MergeOptions for the merge util

* [`855c808e`](https://github.com/sajari/sdk-react/commit/855c808e9a0bc267de9d3cccea1db3f5cc45068f) [#394](https://github.com/sajari/sdk-react/pull/394) Thanks [@sampotts](https://github.com/sampotts)! - Improved usability of the RangeInput component

## 1.3.5

### Patch Changes

- [`20b35922`](https://github.com/sajari/sdk-react/commit/20b35922f07512c9b4581c25a5d71941cb465010) [#388](https://github.com/sajari/sdk-react/pull/388) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed components depend on ThemeProvider wrapper to be able to work.

## 1.3.4

### Patch Changes

- [`65fd3fe2`](https://github.com/sajari/sdk-react/commit/65fd3fe2af94f27daa0d89ee9eab708e275ebbea) [#375](https://github.com/sajari/sdk-react/pull/375) Thanks [@sampotts](https://github.com/sampotts)! - Add more modal width options

## 1.3.3

### Patch Changes

- [`d1af5773`](https://github.com/sajari/sdk-react/commit/d1af57738741a0600e2d15797ffff5648d1c4334) [#366](https://github.com/sajari/sdk-react/pull/366) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Added Modal component for `@sajari/react-components`.

## 1.3.2

### Patch Changes

- [`3953b091`](https://github.com/sajari/sdk-react/commit/3953b091c4d4b899f570f5d6ed33bf5858eb319e) [#369](https://github.com/sajari/sdk-react/pull/369) Thanks [@sampotts](https://github.com/sampotts)! - Added support for originalPrice field

## 1.3.1

### Patch Changes

- [`b8d528bc`](https://github.com/sajari/sdk-react/commit/b8d528bcd258b415cbb2ee6d4fb527abd8a1926b) [#346](https://github.com/sajari/sdk-react/pull/346) Thanks [@sampotts](https://github.com/sampotts)! - Fix RangeInput value rounding when step is less than 1

## 1.3.0

### Minor Changes

- [`8c2939af`](https://github.com/sajari/sdk-react/commit/8c2939af3a9249e20da93c2ed8f37769207b7688) [#323](https://github.com/sajari/sdk-react/pull/323) Thanks [@sampotts](https://github.com/sampotts)! - Added support for ARRAY_MATCH filter expression function

## 1.2.2

### Patch Changes

- [`fb817fb3`](https://github.com/sajari/sdk-react/commit/fb817fb3d1847b66c0748811af02b562af792a25) [#320](https://github.com/sajari/sdk-react/pull/320) Thanks [@sampotts](https://github.com/sampotts)! - Fix price formatting when price isn't a valid Number

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.1](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.2.0...@sajari/react-sdk-utils@1.2.1) (2021-01-05)

**Note:** Version bump only for package @sajari/react-sdk-utils

# [1.2.0](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.1.2...@sajari/react-sdk-utils@1.2.0) (2020-12-31)

### Bug Fixes

- fix issues with build ([9d799ce](https://github.com/sajari/sdk-react/commit/9d799ce8b7adca31d89662652aca815bac268488))
- use shared noop function ([4d2171f](https://github.com/sajari/sdk-react/commit/4d2171fd8a7cc3a1d524d041fd46d7e2361e4833))

### Features

- new custom select and select filter type ([#304](https://github.com/sajari/sdk-react/issues/304)) ([d85db03](https://github.com/sajari/sdk-react/commit/d85db034b9ea70e9f6e1d67a783c51a3a7537ec7))

## [1.1.2](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.1.1...@sajari/react-sdk-utils@1.1.2) (2020-12-18)

**Note:** Version bump only for package @sajari/react-sdk-utils

## [1.1.1](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.1.0...@sajari/react-sdk-utils@1.1.1) (2020-12-15)

### Bug Fixes

- remove console log ([2b4b4c7](https://github.com/sajari/sdk-react/commit/2b4b4c7596eddf4e039ec7bad3eb1b16497be2fd))

# [1.1.0](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0...@sajari/react-sdk-utils@1.1.0) (2020-12-15)

### Features

- localization improvements ([f7b5ea1](https://github.com/sajari/sdk-react/commit/f7b5ea168a09b218e4df8f405c28a847fc85dc18))

# 1.0.0 (2020-12-14)

### Features

- merged v3 to master ([ba23102](https://github.com/sajari/sdk-react/commit/ba231022d78013689f69767e87b152d55ece1d6a))

# [1.0.0-beta.3](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-beta.2...@sajari/react-sdk-utils@1.0.0-beta.3) (2020-12-14)

### Features

- RangeInput improvements ([3d2ac31](https://github.com/sajari/sdk-react/commit/3d2ac3155f74e521bbe57d75e184dcf8e0be6bcd))

# [1.0.0-beta.2](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-beta.1...@sajari/react-sdk-utils@1.0.0-beta.2) (2020-12-11)

### Bug Fixes

- prevent decodeHTML trying to access DOM in SSR ([edb4bcf](https://github.com/sajari/sdk-react/commit/edb4bcfc1fc3b8a470908e11dc7e915e7acdfca9))

# [1.0.0-beta.1](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.20...@sajari/react-sdk-utils@1.0.0-beta.1) (2020-12-04)

**Note:** Version bump only for package @sajari/react-sdk-utils

# [1.0.0-alpha.20](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.19...@sajari/react-sdk-utils@1.0.0-alpha.20) (2020-12-04)

**Note:** Version bump only for package @sajari/react-sdk-utils

# [1.0.0-alpha.19](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.18...@sajari/react-sdk-utils@1.0.0-alpha.19) (2020-12-03)

### Bug Fixes

- change isEmpty to check for null and undefined ([00526a5](https://github.com/sajari/sdk-react/commit/00526a502e367d8c33efe55d4f416bd8fce5391e))

# [1.0.0-alpha.18](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.17...@sajari/react-sdk-utils@1.0.0-alpha.18) (2020-12-03)

### Bug Fixes

- inherit fontFamily in input components ([2823134](https://github.com/sajari/sdk-react/commit/2823134617c74ee65b17d160375fe48c28a37f7c))

# [1.0.0-alpha.17](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.16...@sajari/react-sdk-utils@1.0.0-alpha.17) (2020-12-03)

**Note:** Version bump only for package @sajari/react-sdk-utils

# [1.0.0-alpha.16](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.15...@sajari/react-sdk-utils@1.0.0-alpha.16) (2020-12-03)

### Bug Fixes

- fix unwanted props leaking to the DOM ([0ad76bc](https://github.com/sajari/sdk-react/commit/0ad76bc8deddd499cc5687dfb0ca2686af3b2b22))

# [1.0.0-alpha.15](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.14...@sajari/react-sdk-utils@1.0.0-alpha.15) (2020-12-02)

### Bug Fixes

- default count to false for bucket filters ([19dfdc2](https://github.com/sajari/sdk-react/commit/19dfdc2fe11539f6bbbb04077963c92fb4d02f63))

# [1.0.0-alpha.14](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.13...@sajari/react-sdk-utils@1.0.0-alpha.14) (2020-12-01)

### Features

- add option to control styling of components ([#248](https://github.com/sajari/sdk-react/issues/248)) ([fbc1114](https://github.com/sajari/sdk-react/commit/fbc1114399dfefaa48d215ba628da55130915b6b))
- made importantStyles false by default ([d610e3a](https://github.com/sajari/sdk-react/commit/d610e3a2f5d9149a185b7bcfdbd617ce2a225dcb))

# [1.0.0-alpha.13](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.12...@sajari/react-sdk-utils@1.0.0-alpha.13) (2020-11-30)

### Features

- added i18n support ([9a977b2](https://github.com/sajari/sdk-react/commit/9a977b29d9f430686523bf65e54e5fb5921dce51))

# [1.0.0-alpha.12](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.11...@sajari/react-sdk-utils@1.0.0-alpha.12) (2020-11-27)

**Note:** Version bump only for package @sajari/react-sdk-utils

# [1.0.0-alpha.11](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.10...@sajari/react-sdk-utils@1.0.0-alpha.11) (2020-11-27)

### Features

- allow independent aspectRatio and objectFit props on Results ([7900493](https://github.com/sajari/sdk-react/commit/79004930cde3b403d52917c50e94d92aca47e98e))

# [1.0.0-alpha.10](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.9...@sajari/react-sdk-utils@1.0.0-alpha.10) (2020-11-26)

### Features

- only pinSelected if item count is over limit ([33ded9a](https://github.com/sajari/sdk-react/commit/33ded9a50465af2c0a273b821a15bc879a980638))

# [1.0.0-alpha.9](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.8...@sajari/react-sdk-utils@1.0.0-alpha.9) (2020-11-26)

### Bug Fixes

- styling fixes for buttons ([d642b72](https://github.com/sajari/sdk-react/commit/d642b72cda043c699a3a2734cba4763aed08b2d0))

# [1.0.0-alpha.8](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.7...@sajari/react-sdk-utils@1.0.0-alpha.8) (2020-11-25)

### Bug Fixes

- isEmpty handle undefined values ([5c77160](https://github.com/sajari/sdk-react/commit/5c7716005b0d98412a3c8f56e885f38ab6018f48))

# [1.0.0-alpha.7](https://github.com/sajari/sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.6...@sajari/react-sdk-utils@1.0.0-alpha.7) (2020-11-24)

### Features

- added inherit option for fontFamily ([537cdf4](https://github.com/sajari/sdk-react/commit/537cdf41dd4cf335463d1f2a859920e8b1f5e3fa))

# [1.0.0-alpha.6](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.5...@sajari/react-sdk-utils@1.0.0-alpha.6) (2020-11-20)

### Bug Fixes

- remove references to navigator ([1fdd116](https://github.com/sajari/sajari-sdk-react/commit/1fdd1166e284e5b4e7cb62cbac4bd0f9ce772130))
- update SSR logic check ([589ff03](https://github.com/sajari/sajari-sdk-react/commit/589ff03e7dc7b955ffb94cd57600e2ac86a26ad1))

# [1.0.0-alpha.5](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.4...@sajari/react-sdk-utils@1.0.0-alpha.5) (2020-11-18)

**Note:** Version bump only for package @sajari/react-sdk-utils

# [1.0.0-alpha.4](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.3...@sajari/react-sdk-utils@1.0.0-alpha.4) (2020-11-17)

**Note:** Version bump only for package @sajari/react-sdk-utils

# [1.0.0-alpha.3](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.2...@sajari/react-sdk-utils@1.0.0-alpha.3) (2020-11-17)

**Note:** Version bump only for package @sajari/react-sdk-utils

# [1.0.0-alpha.2](https://github.com/sajari/sajari-sdk-react/compare/@sajari/react-sdk-utils@1.0.0-alpha.1...@sajari/react-sdk-utils@1.0.0-alpha.2) (2020-11-16)

### Bug Fixes

- utils - specify emotion as deps instead of devdeps ([#221](https://github.com/sajari/sajari-sdk-react/issues/221)) ([2d83148](https://github.com/sajari/sajari-sdk-react/commit/2d83148f4bae6f1e678b2bfe689272152f9da67b))

### Features

- update merge util to accept N sources ([8507a7e](https://github.com/sajari/sajari-sdk-react/commit/8507a7e12278b06caa24bba1c71bbf5923409a63))
