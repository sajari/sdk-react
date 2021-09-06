# Change Log

## 1.9.6

### Patch Changes

- [`671214b0`](https://github.com/sajari/sdk-react/commit/671214b05d31899750908879bacd1b9349d976c5) [#622](https://github.com/sajari/sdk-react/pull/622) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Allow result links to be open in a new tab.

## 1.9.5

### Patch Changes

- [`863785df`](https://github.com/sajari/sdk-react/commit/863785dfa0a67a03da75cd90445fad1c585f4eff) [#606](https://github.com/sajari/sdk-react/pull/606) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix range input handles overlap if min is to max.

* [`16192d33`](https://github.com/sajari/sdk-react/commit/16192d3307471979abcd000d26141ebdbe710be6) [#607](https://github.com/sajari/sdk-react/pull/607) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix missing setting key for emotion cache which causes a warning if an app requires using multiple emotion caches.

## 1.9.4

### Patch Changes

- [`4e0b3afd`](https://github.com/sajari/sdk-react/commit/4e0b3afde0ee5ace8adbd6c8c4c5114ee3e0dd8a) [#603](https://github.com/sajari/sdk-react/pull/603) Thanks [@huygn](https://github.com/huygn)! - Fix broken combobox styling because spacing of child element is controlled by the font size of the parent container.

## 1.9.3

### Patch Changes

- [`c803bd4c`](https://github.com/sajari/sdk-react/commit/c803bd4c5d7a5eed7372811df13852556755392f) [#602](https://github.com/sajari/sdk-react/pull/602) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Apply new Tailwind config to support `em` instead of `rem` for component packages.

## 1.9.2

### Patch Changes

- [`3c93976b`](https://github.com/sajari/sdk-react/commit/3c93976b04e3629b03ea778bbe4aa8aaba13f093) [#588](https://github.com/sajari/sdk-react/pull/588) Thanks [@tuanddd](https://github.com/tuanddd)! - Add `portalContainer` prop to combobox

## 1.9.1

### Patch Changes

- [`6f34914a`](https://github.com/sajari/sdk-react/commit/6f34914ae92f850f7009bbbbb2c661217deaf632) [#580](https://github.com/sajari/sdk-react/pull/580) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix the issue when the footer of the modal gets hidden on iPad. It was because we used `vh` to limit the max height of the modal content but on mobile browsers, the bottom bar is not part the the `100vh` height so the bottom UI will be cut off when the address bar is visible. For more details, see https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html.

* [`995c5117`](https://github.com/sajari/sdk-react/commit/995c5117e9a053a79dc6638b02243b60b155a6ae) [#576](https://github.com/sajari/sdk-react/pull/576) Thanks [@wwalser](https://github.com/wwalser)! - Updated dependencies in order to create a more reliable build. This should have no runtime side effects but because it alters dependencies it felt best to do a patch version bump.

## 1.9.0

### Minor Changes

- [`a083ed1f`](https://github.com/sajari/sdk-react/commit/a083ed1f1c02283ac1d597dbb77866b5a53f148e) [#527](https://github.com/sajari/sdk-react/pull/527) Thanks [@tuanddd](https://github.com/tuanddd)! - Add support for result templating

## 1.8.7

### Patch Changes

- [`00300224`](https://github.com/sajari/sdk-react/commit/0030022497ca8dd566ddfb30fef8f7088de98fc4) [#564](https://github.com/sajari/sdk-react/pull/564) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Include `fields:''` in the body request to always expect `_id` to be in the response. It's necessary, otherwise, it could break the re-render process of Results where the `key` relies on the `_id`.

## 1.8.6

### Patch Changes

- [`366b3de9`](https://github.com/sajari/sdk-react/commit/366b3de997b7854061b7d1be101298109ad7634e) [#559](https://github.com/sajari/sdk-react/pull/559) Thanks [@tuanddd](https://github.com/tuanddd)! - Fix the dropdown flicker issue when using minimum characters

* [`218e3702`](https://github.com/sajari/sdk-react/commit/218e3702c53dffc0db71697b9606e341177522d8) [#558](https://github.com/sajari/sdk-react/pull/558) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix the reset button on a list filter doesn't show correctly.

- [`ecdaedfc`](https://github.com/sajari/sdk-react/commit/ecdaedfc57921bac1c546cd4f5999d6b5e7ad1c0) [#560](https://github.com/sajari/sdk-react/pull/560) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix incorrect docs for `ProviderPipelineConfig`.

## 1.8.5

### Patch Changes

- [`460bb2b6`](https://github.com/sajari/sdk-react/commit/460bb2b63907f37779f3b4b4c9f6633e7be8da2a) [#553](https://github.com/sajari/sdk-react/pull/553) Thanks [@tuanddd](https://github.com/tuanddd)! - Fix typo from "minium" to "minimum"

## 1.8.4

### Patch Changes

- [`c4ebeaf5`](https://github.com/sajari/sdk-react/commit/c4ebeaf5901f274e89fd2e043dd01e6cca66bc43) [#552](https://github.com/sajari/sdk-react/pull/552) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix typing in the `Input` will lose focus if it clears the selected items in a list filter. It was because it aims to re-focus on the last selected item once the selected state changed, but since the selected state can be changed by typing on the search input, it will move the focus onto the last selected checkbox.

* [`a7e300b1`](https://github.com/sajari/sdk-react/commit/a7e300b1979cf173d66482ae09621647c3ab6629) [#550](https://github.com/sajari/sdk-react/pull/550) Thanks [@tuanddd](https://github.com/tuanddd)! - Add an option for specifying how many characters are needed to perform a search request.

## 1.8.3

### Patch Changes

- [`dfde14e1`](https://github.com/sajari/sdk-react/commit/dfde14e19d61f3fe0ccf23fdc14148f7e8c5b519) [#548](https://github.com/sajari/sdk-react/pull/548) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Update `useRangeFilter` reset method to follow the change of `RangeFilterBuilder` reset as setting the filter to `null` is equivalent to setting the filter to `[min, max]`. Also, remove the redundant `aggregateReset`.

## 1.8.2

### Patch Changes

- [`8c1991b5`](https://github.com/sajari/sdk-react/commit/8c1991b5aa0fe441d69c5fe6906bb44dfcf0df6b) [#546](https://github.com/sajari/sdk-react/pull/546) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix missing `arraysEqual` in `@sajari/react-sdk-utils` package.

## 1.8.1

### Patch Changes

- [`5f7d49ec`](https://github.com/sajari/sdk-react/commit/5f7d49ec80492d5ed6cb950dc237d1d9f30c8833) [#543](https://github.com/sajari/sdk-react/pull/543) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Clear filters when a user performs a new search.

## 1.8.0

### Minor Changes

- [`301d5a0c`](https://github.com/sajari/sdk-react/commit/301d5a0c8c47fbb619c7c1b0c2664f26ee7afe59) [#538](https://github.com/sajari/sdk-react/pull/538) Thanks [@wwalser](https://github.com/wwalser)! - Added support for sale price

## 1.7.3

### Patch Changes

- [`57a22528`](https://github.com/sajari/sdk-react/commit/57a225282db6a53585e64440f3876df2805d86f9) [#530](https://github.com/sajari/sdk-react/pull/530) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix `capitalize` utility works incorrectly, where a string in uppercase letters is not converted to a capitalized output. For example, `hELLO` is converted to `HELLO` instead of `Hello`.

## 1.7.2

### Patch Changes

- [`355e1651`](https://github.com/sajari/sdk-react/commit/355e1651415d5a0ab1f7f0f0847ba3838c4a3235) [#528](https://github.com/sajari/sdk-react/pull/528) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix `capitalize-first-letter` option of textTransform won't work if the text input is all uppercasce.

## 1.7.1

### Patch Changes

- [`8cbedc87`](https://github.com/sajari/sdk-react/commit/8cbedc8750381a2c9d6bb688882be5921f8598bd) [#517](https://github.com/sajari/sdk-react/pull/517) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix margin of menu option is overridden by external CSS.

* [`92a87440`](https://github.com/sajari/sdk-react/commit/92a874404802b5b219f6e03e45116e90640df4ef) [#521](https://github.com/sajari/sdk-react/pull/521) Thanks [@tuanddd](https://github.com/tuanddd)! - Add reset button when an error is thrown

## 1.7.0

### Minor Changes

- [`ab4acfaf`](https://github.com/sajari/sdk-react/commit/ab4acfaf24a5a86fb55f73f9061a3e69160576b4) [#515](https://github.com/sajari/sdk-react/pull/515) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Allow `setSorting` to call without running search.

## 1.6.29

### Patch Changes

- [`7aa34c7b`](https://github.com/sajari/sdk-react/commit/7aa34c7bd98cb9f916f4a022694b11fbb88dbeac) [#509](https://github.com/sajari/sdk-react/pull/509) Thanks [@tuanddd](https://github.com/tuanddd)! - Update Input component typings and documentation

## 1.6.28

### Patch Changes

- [`c33fa083`](https://github.com/sajari/sdk-react/commit/c33fa08321057c5b97eb5045bb59c3e62ea8a41a) [#508](https://github.com/sajari/sdk-react/pull/508) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Support `includes`, `excludes` and `prefixFilter` for `useFilter`.

## 1.6.27

### Patch Changes

- [`5732b091`](https://github.com/sajari/sdk-react/commit/5732b09192a9e8b02d82d135185566a283c66568) [#496](https://github.com/sajari/sdk-react/pull/496) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix missing redirect rules.

## 1.6.26

### Patch Changes

- [`bfe08580`](https://github.com/sajari/sdk-react/commit/bfe08580709f5a102737c3beb10a7c35580b77ff) [#495](https://github.com/sajari/sdk-react/pull/495) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix style is broken on Combobox due to `box-sizing` being overridden.

## 1.6.25

### Patch Changes

- [`7dbf22ab`](https://github.com/sajari/sdk-react/commit/7dbf22abefd698a3601fcc9cdc117d7d11f7877b) [#491](https://github.com/sajari/sdk-react/pull/491) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Allow `resetFilters` to optionally not emit subscribing events of filters. It is useful when we want to reset all filters to their default value but don't want to trigger a search request.

## 1.6.24

### Patch Changes

- [`848b332d`](https://github.com/sajari/sdk-react/commit/848b332d777b1f497cb0f88375212ec234602007) [#486](https://github.com/sajari/sdk-react/pull/486) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Support `list` display for `Sorting` component.

* [`e0f254e3`](https://github.com/sajari/sdk-react/commit/e0f254e38f96f63254919ec003a051864a04cea1) [#488](https://github.com/sajari/sdk-react/pull/488) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Update `Modal` and `Combobox` component to support the mobile view of overlay mode.

## 1.6.23

### Patch Changes

- [`01e8eb88`](https://github.com/sajari/sdk-react/commit/01e8eb881da29d3108262f5a277a458caa7083fc) [#480](https://github.com/sajari/sdk-react/pull/480) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix styles being overridden by external CSS.

## 1.6.22

### Patch Changes

- [`0da17751`](https://github.com/sajari/sdk-react/commit/0da17751f5e78a21457774539adb1a876738bcfa) [#478](https://github.com/sajari/sdk-react/pull/478) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Add `variant` prop and `2xl` option for `size` prop for Combobox.

## 1.6.21

### Patch Changes

- [`1ecadbb6`](https://github.com/sajari/sdk-react/commit/1ecadbb699a088da4b203a7208f49c5265c662c9) [#473](https://github.com/sajari/sdk-react/pull/473) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Prevent styling of components from being overridden by external CSS such as Shopify themes.

## 1.6.20

### Patch Changes

- [`3ddf0a7d`](https://github.com/sajari/sdk-react/commit/3ddf0a7d74f6812621b4be415768f89366c81a40) [#469](https://github.com/sajari/sdk-react/pull/469) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Enable `showPoweredBy` prop for Input to show/hide Sajari logo.

## 1.6.19

### Patch Changes

- [`026dbaf1`](https://github.com/sajari/sdk-react/commit/026dbaf19bb0e30ead92978df36f2dae0c4066a3) [#466](https://github.com/sajari/sdk-react/pull/466) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix return `undefined` if passing empty string to `formatLabel`.

## 1.6.18

### Patch Changes

- [`acde246a`](https://github.com/sajari/sdk-react/commit/acde246a122a31cdc6e510a85cdb36769d5d2474) [#462](https://github.com/sajari/sdk-react/pull/462) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Add option to hide records count on filter components.

* [`596c40af`](https://github.com/sajari/sdk-react/commit/596c40af977ac672e4f171933a02ca6f7813f440) [#461](https://github.com/sajari/sdk-react/pull/461) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Support `textTransform` prop for capitalization of text options for `select`, `list` and `tabs` filter.

## 1.6.17

### Patch Changes

- [`557ad2cb`](https://github.com/sajari/sdk-react/commit/557ad2cb47b9b744b805185af721f46ed12e5376) [#458](https://github.com/sajari/sdk-react/pull/458) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Add additional styling for `Combobox`'s input to somewhat avoid its styles being overridden by external CSS.

## 1.6.16

### Patch Changes

- [`9b15a269`](https://github.com/sajari/sdk-react/commit/9b15a269ac972088b8b92cd479b3b431a2461c14) [#448](https://github.com/sajari/sdk-react/pull/448) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Add support show/hide images on result list.

## 1.6.15

### Patch Changes

- [`2699f1a5`](https://github.com/sajari/sdk-react/commit/2699f1a5c5e9e3b9cd27359efa2a11b541bd8167) [#446](https://github.com/sajari/sdk-react/pull/446) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed the issue when passing `className` for `Input` does not have effect if the `customClassNames` is set in the context.

* [`c02fa55b`](https://github.com/sajari/sdk-react/commit/c02fa55bc24dc16458f555c5b79a7e8a949a85ab) [#444](https://github.com/sajari/sdk-react/pull/444) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed the issue when using speech search does not trigger a search for the voice input. Also make an update to open the dropdown menu if the input mode is `results`.

## 1.6.14

### Patch Changes

- [`77d5ec4e`](https://github.com/sajari/sdk-react/commit/77d5ec4eb80520ba91f12f2d73380b78e8a8361c) [#440](https://github.com/sajari/sdk-react/pull/440) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Allow ratings filter options to be ordered highest to lowest.

* [`bd9bb0fd`](https://github.com/sajari/sdk-react/commit/bd9bb0fdde2f0f2b287656ed99e7a04b31b4c63c) [#441](https://github.com/sajari/sdk-react/pull/441) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Added support `maxSuggestions` for `Input`.

- [`c4781d9a`](https://github.com/sajari/sdk-react/commit/c4781d9a070746d9164ec4deaa1a5c059516e666) [#443](https://github.com/sajari/sdk-react/pull/443) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Added support `autoFocus` for `Combobox`.

## 1.6.13

### Patch Changes

- [`72c2879a`](https://github.com/sajari/sdk-react/commit/72c2879a24da46ac281ef5433802b8a4b6624b9c) [#427](https://github.com/sajari/sdk-react/pull/427) Thanks [@sampotts](https://github.com/sampotts)! - Small tweak

## 1.6.12

### Patch Changes

- [`c374223e`](https://github.com/sajari/sdk-react/commit/c374223e67fd75fc9a4810fbb4e46a1872d8bd26) [#421](https://github.com/sajari/sdk-react/pull/421) Thanks [@sampotts](https://github.com/sampotts)! - Improved types for RangeInput component

## 1.6.11

### Patch Changes

- [`d2636fdb`](https://github.com/sajari/sdk-react/commit/d2636fdb70112366fc40ffd207cb5d44c6786b3d) [#415](https://github.com/sajari/sdk-react/pull/415) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed incorrrect summary message where the query is disabled.

* [`ab41772c`](https://github.com/sajari/sdk-react/commit/ab41772c15cd81a02de0aa6bcb2cccb45e93765f) [#414](https://github.com/sajari/sdk-react/pull/414) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed cursor jumps to end of input when typing mid query.

## 1.6.10

### Patch Changes

- [`63bf8f68`](https://github.com/sajari/sdk-react/commit/63bf8f6838b9d1f61bcc593740309bc3f4b02246) [#412](https://github.com/sajari/sdk-react/pull/412) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Added `center` prop to Modal. Also, fixed linting issues.

## 1.6.9

### Patch Changes

- [`a01365c6`](https://github.com/sajari/sdk-react/commit/a01365c6ff37c463abe95a05bf00fddd88eb9d2d) [#391](https://github.com/sajari/sdk-react/pull/391) Thanks [@sampotts](https://github.com/sampotts)! - Clean up title logic

* [`855c808e`](https://github.com/sajari/sdk-react/commit/855c808e9a0bc267de9d3cccea1db3f5cc45068f) [#394](https://github.com/sajari/sdk-react/pull/394) Thanks [@sampotts](https://github.com/sampotts)! - Improved usability of the RangeInput component

## 1.6.8

### Patch Changes

- [`e482cb24`](https://github.com/sajari/sdk-react/commit/e482cb2403f7c1486447dcfce6a5d8ccc680613d) [#390](https://github.com/sajari/sdk-react/pull/390) Thanks [@sampotts](https://github.com/sampotts)! - Fixed title issues

* [`20b35922`](https://github.com/sajari/sdk-react/commit/20b35922f07512c9b4581c25a5d71941cb465010) [#388](https://github.com/sajari/sdk-react/pull/388) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fixed components depend on ThemeProvider wrapper to be able to work.

## 1.6.7

### Patch Changes

- [`2ffbc5d9`](https://github.com/sajari/sdk-react/commit/2ffbc5d9dc9de2e28413b7314b9733e65d35032a) [#385](https://github.com/sajari/sdk-react/pull/385) Thanks [@sampotts](https://github.com/sampotts)! - Package updates and minor doc updates

* [`2ffbc5d9`](https://github.com/sajari/sdk-react/commit/2ffbc5d9dc9de2e28413b7314b9733e65d35032a) [#385](https://github.com/sajari/sdk-react/pull/385) Thanks [@sampotts](https://github.com/sampotts)! - Add useSearch example of multiple searches

## 1.6.6

### Patch Changes

- [`a76beb89`](https://github.com/sajari/sdk-react/commit/a76beb8991bbf6063bf5b4e4dff29a104d6cca5c) [#383](https://github.com/sajari/sdk-react/pull/383) Thanks [@sampotts](https://github.com/sampotts)! - Add useSearch example of multiple searches

## 1.6.5

### Patch Changes

- [`65fd3fe2`](https://github.com/sajari/sdk-react/commit/65fd3fe2af94f27daa0d89ee9eab708e275ebbea) [#375](https://github.com/sajari/sdk-react/pull/375) Thanks [@sampotts](https://github.com/sampotts)! - Add more modal width options

## 1.6.4

### Patch Changes

- [`8f1bd0e6`](https://github.com/sajari/sdk-react/commit/8f1bd0e6d197f19dca1c1af2bc2d2f1e2785d4fb) [#374](https://github.com/sajari/sdk-react/pull/374) Thanks [@sampotts](https://github.com/sampotts)! - Allow ClickTracking on non URL fields

* [`d1af5773`](https://github.com/sajari/sdk-react/commit/d1af57738741a0600e2d15797ffff5648d1c4334) [#366](https://github.com/sajari/sdk-react/pull/366) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Added Modal component for `@sajari/react-components`.

## 1.6.3

### Patch Changes

- [`3953b091`](https://github.com/sajari/sdk-react/commit/3953b091c4d4b899f570f5d6ed33bf5858eb319e) [#369](https://github.com/sajari/sdk-react/pull/369) Thanks [@sampotts](https://github.com/sampotts)! - Added support for originalPrice field

## 1.6.2

### Patch Changes

- [`8a919df2`](https://github.com/sajari/sdk-react/commit/8a919df2d07b4b5adc0c8dab61fe755a89458f60) [#367](https://github.com/sajari/sdk-react/pull/367) Thanks [@sampotts](https://github.com/sampotts)! - Fix DOMException related to querySelector syntax

## 1.6.1

### Patch Changes

- [`85d52aa9`](https://github.com/sajari/sdk-react/commit/85d52aa91b95810ef6342b6ea9ac7f785072b1dc) [#359](https://github.com/sajari/sdk-react/pull/359) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix using `useRangeFilter` will trigger an unwanted call of `reset` method in `didMount` phase.

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.6.0](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.3.2...sajari-sdk-docs@1.6.0) (2021-01-14)

### Bug Fixes

- allow 1 decimal place in RangeFilterBuilder formatter ([#342](https://github.com/sajari/sdk-react/issues/342)) ([f0e50c6](https://github.com/sajari/sdk-react/commit/f0e50c6dce29c53f0d84f580e84a42781464d419))
- fix handling of steps in RangeInput ([#337](https://github.com/sajari/sdk-react/issues/337)) ([c785270](https://github.com/sajari/sdk-react/commit/c785270dd370400058cc702e1ea50a2361cfe197))
- fix pagination aria labels ([#318](https://github.com/sajari/sdk-react/issues/318)) ([1f2ba34](https://github.com/sajari/sdk-react/commit/1f2ba34add8856b75512600f06a9a9ba2cf99ae2))
- improve RangeInput input styling ([#335](https://github.com/sajari/sdk-react/issues/335)) ([cd997aa](https://github.com/sajari/sdk-react/commit/cd997aa980a2f9793ed3c74281f87dd57c89ade1))
- improve rounding logic for range filters ([#348](https://github.com/sajari/sdk-react/issues/348)) ([f20fae2](https://github.com/sajari/sdk-react/commit/f20fae2c592264b7387b33139b8b37c048e2b5b9))
- make RangeFilter more failsafe default for non aggregate ([#313](https://github.com/sajari/sdk-react/issues/313)) ([eb4c40d](https://github.com/sajari/sdk-react/commit/eb4c40d2951cb960ec50c789a22dffdac5596d23))

### Features

- added compact prop to Pagination component ([#314](https://github.com/sajari/sdk-react/issues/314)) ([c987a1c](https://github.com/sajari/sdk-react/commit/c987a1c5e9b13f9034d9bad6db9adf631d2ba161))
- added support for ARRAY_MATCH filter grouping ([#323](https://github.com/sajari/sdk-react/issues/323)) ([8c2939a](https://github.com/sajari/sdk-react/commit/8c2939af3a9249e20da93c2ed8f37769207b7688))

# [1.4.0](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.3.2...sajari-sdk-docs@1.4.0) (2021-01-08)

### Bug Fixes

- make RangeFilter more failsafe default for non aggregate ([#313](https://github.com/sajari/sdk-react/issues/313)) ([eb4c40d](https://github.com/sajari/sdk-react/commit/eb4c40d2951cb960ec50c789a22dffdac5596d23))

### Features

- added compact prop to Pagination component ([#314](https://github.com/sajari/sdk-react/issues/314)) ([c987a1c](https://github.com/sajari/sdk-react/commit/c987a1c5e9b13f9034d9bad6db9adf631d2ba161))

## [1.3.2](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.3.1...sajari-sdk-docs@1.3.2) (2021-01-07)

### Bug Fixes

- fix filter render lags ([ad5e161](https://github.com/sajari/sdk-react/commit/ad5e16162ba6e9f9d8650c71ec8779ed58a5cb7c))

## [1.3.1](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.3.0...sajari-sdk-docs@1.3.1) (2021-01-06)

### Bug Fixes

- laggy filter search ([#305](https://github.com/sajari/sdk-react/issues/305)) ([9bf2667](https://github.com/sajari/sdk-react/commit/9bf2667c4e8a7e6f3b6bf9ccf707d45c19be1998))

# [1.3.0](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.2.2...sajari-sdk-docs@1.3.0) (2021-01-05)

### Features

- add hover functionality to image ([#301](https://github.com/sajari/sdk-react/issues/301)) ([8eb55fb](https://github.com/sajari/sdk-react/commit/8eb55fb0a5e49a4f415f8bd4ca5108777ead1528))

## [1.2.2](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.2.1...sajari-sdk-docs@1.2.2) (2021-01-04)

### Bug Fixes

- fix SSR issues with Pagination ([6e2a6ab](https://github.com/sajari/sdk-react/commit/6e2a6ab9e9912de4bf6df869613a5f21dcab3693))

## [1.2.1](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.2.0...sajari-sdk-docs@1.2.1) (2021-01-01)

### Bug Fixes

- improvement to Select rendering ([9de9791](https://github.com/sajari/sdk-react/commit/9de9791fd607814a967b7d9736c22451fbfffc30))

# [1.2.0](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.1.4...sajari-sdk-docs@1.2.0) (2020-12-31)

### Features

- new custom select and select filter type ([#304](https://github.com/sajari/sdk-react/issues/304)) ([d85db03](https://github.com/sajari/sdk-react/commit/d85db034b9ea70e9f6e1d67a783c51a3a7537ec7))

## [1.1.4](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.1.3...sajari-sdk-docs@1.1.4) (2020-12-18)

### Bug Fixes

- default usePagination argument to ‘search’ ([2621f46](https://github.com/sajari/sdk-react/commit/2621f46d6b000567ecc809ad34ed34e1ead02b54))

## [1.1.3](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.1.2...sajari-sdk-docs@1.1.3) (2020-12-16)

**Note:** Version bump only for package sajari-sdk-docs

## [1.1.2](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.1.1...sajari-sdk-docs@1.1.2) (2020-12-15)

**Note:** Version bump only for package sajari-sdk-docs

## [1.1.1](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.1.0...sajari-sdk-docs@1.1.1) (2020-12-15)

**Note:** Version bump only for package sajari-sdk-docs

# [1.1.0](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0...sajari-sdk-docs@1.1.0) (2020-12-15)

### Features

- localization improvements ([f7b5ea1](https://github.com/sajari/sdk-react/commit/f7b5ea168a09b218e4df8f405c28a847fc85dc18))

# 1.0.0 (2020-12-14)

### Features

- merged v3 to master ([ba23102](https://github.com/sajari/sdk-react/commit/ba231022d78013689f69767e87b152d55ece1d6a))

# [1.0.0-beta.8](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-beta.7...sajari-sdk-docs@1.0.0-beta.8) (2020-12-14)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-beta.7](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-beta.6...sajari-sdk-docs@1.0.0-beta.7) (2020-12-11)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-beta.6](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-beta.5...sajari-sdk-docs@1.0.0-beta.6) (2020-12-10)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-beta.5](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-beta.4...sajari-sdk-docs@1.0.0-beta.5) (2020-12-10)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-beta.4](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-beta.3...sajari-sdk-docs@1.0.0-beta.4) (2020-12-09)

### Features

- added SSRProvider component ([8aaa2d5](https://github.com/sajari/sdk-react/commit/8aaa2d560803479c9697756322e2689c968e9a44))

# [1.0.0-beta.3](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-beta.2...sajari-sdk-docs@1.0.0-beta.3) (2020-12-08)

### Features

- improvements to SSR support ([729dfeb](https://github.com/sajari/sdk-react/commit/729dfebc04efadbe1db297666ebec4a104208a70))

# [1.0.0-beta.2](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-beta.1...sajari-sdk-docs@1.0.0-beta.2) (2020-12-07)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-beta.1](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.27...sajari-sdk-docs@1.0.0-beta.1) (2020-12-04)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-alpha.27](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.26...sajari-sdk-docs@1.0.0-alpha.27) (2020-12-04)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-alpha.26](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.25...sajari-sdk-docs@1.0.0-alpha.26) (2020-12-03)

### Bug Fixes

- rename ResultsPerPage sizes prop to options for consistency ([4a2b6d4](https://github.com/sajari/sdk-react/commit/4a2b6d4fd8b60b337faeb237b53c23793b73f7ef))

# [1.0.0-alpha.25](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.24...sajari-sdk-docs@1.0.0-alpha.25) (2020-12-03)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-alpha.24](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.23...sajari-sdk-docs@1.0.0-alpha.24) (2020-12-03)

### Bug Fixes

- empty query search logic ([#274](https://github.com/sajari/sdk-react/issues/274)) ([37acaee](https://github.com/sajari/sdk-react/commit/37acaeefe1b2e30e97461527b4a95522e15ccef5))
- remove redundant variables ([#272](https://github.com/sajari/sdk-react/issues/272)) ([fe57235](https://github.com/sajari/sdk-react/commit/fe57235d219c2003e56764c54958149931b5c2c6))
- summary disable suggestion by default ([#273](https://github.com/sajari/sdk-react/issues/273)) ([7c448b8](https://github.com/sajari/sdk-react/commit/7c448b850d185b8af9616f8536c5b101ba250c0d))

# [1.0.0-alpha.23](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.22...sajari-sdk-docs@1.0.0-alpha.23) (2020-12-02)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-alpha.22](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.21...sajari-sdk-docs@1.0.0-alpha.22) (2020-12-02)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-alpha.21](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.20...sajari-sdk-docs@1.0.0-alpha.21) (2020-12-01)

### Features

- add fontSize prop to Checkbox and Radio ([12a41aa](https://github.com/sajari/sdk-react/commit/12a41aa4dd2e8806ed93d803db1ef9d448fbb143))
- added TabFilter component ([#259](https://github.com/sajari/sdk-react/issues/259)) ([d19ccc7](https://github.com/sajari/sdk-react/commit/d19ccc76aebac7a26ee9386c72d4959d5d0b360e))

# [1.0.0-alpha.20](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.19...sajari-sdk-docs@1.0.0-alpha.20) (2020-11-30)

### Features

- added i18n support ([9a977b2](https://github.com/sajari/sdk-react/commit/9a977b29d9f430686523bf65e54e5fb5921dce51))

# [1.0.0-alpha.19](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.18...sajari-sdk-docs@1.0.0-alpha.19) (2020-11-27)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-alpha.18](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.17...sajari-sdk-docs@1.0.0-alpha.18) (2020-11-27)

### Features

- allow independent aspectRatio and objectFit props on Results ([7900493](https://github.com/sajari/sdk-react/commit/79004930cde3b403d52917c50e94d92aca47e98e))

# [1.0.0-alpha.17](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.16...sajari-sdk-docs@1.0.0-alpha.17) (2020-11-26)

### Bug Fixes

- make PoweredBy compose a Link ([a8f6a4e](https://github.com/sajari/sdk-react/commit/a8f6a4e9fdc04f4f652de0f2d640487896d34c6d))

# [1.0.0-alpha.16](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.15...sajari-sdk-docs@1.0.0-alpha.16) (2020-11-26)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-alpha.15](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.14...sajari-sdk-docs@1.0.0-alpha.15) (2020-11-26)

### Features

- add rating filter ([#253](https://github.com/sajari/sdk-react/issues/253)) ([3ea1dd8](https://github.com/sajari/sdk-react/commit/3ea1dd8417b034421a5d33781a190f09aaba8c91))
- only pinSelected if item count is over limit ([33ded9a](https://github.com/sajari/sdk-react/commit/33ded9a50465af2c0a273b821a15bc879a980638))

# [1.0.0-alpha.14](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.13...sajari-sdk-docs@1.0.0-alpha.14) (2020-11-26)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-alpha.13](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.12...sajari-sdk-docs@1.0.0-alpha.13) (2020-11-26)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-alpha.12](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.11...sajari-sdk-docs@1.0.0-alpha.12) (2020-11-26)

### Bug Fixes

- results appearance ([#249](https://github.com/sajari/sdk-react/issues/249)) ([ceef5b0](https://github.com/sajari/sdk-react/commit/ceef5b0cfc71635b4a4b090abaffc20ab4a6f880))

### Features

- don’t require variables to be set (nicer DX) ([f95fb3c](https://github.com/sajari/sdk-react/commit/f95fb3c4293bfbf540a3158d8a6d0ebfe8768858))

# [1.0.0-alpha.11](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.10...sajari-sdk-docs@1.0.0-alpha.11) (2020-11-26)

### Bug Fixes

- styling updates ([83bca31](https://github.com/sajari/sdk-react/commit/83bca31c4b88d4ea565b1fbf0d1b5625a5d0ce27))

### Features

- added size options for view option components ([ccef487](https://github.com/sajari/sdk-react/commit/ccef487a60374d35ea5e4a08278a5d1334f5f305))

# [1.0.0-alpha.10](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.9...sajari-sdk-docs@1.0.0-alpha.10) (2020-11-26)

### Bug Fixes

- useSearch ([#246](https://github.com/sajari/sdk-react/issues/246)) ([0ae10a2](https://github.com/sajari/sdk-react/commit/0ae10a2c66f2fffab3c977bb3291ff69178bf684))

# [1.0.0-alpha.9](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.8...sajari-sdk-docs@1.0.0-alpha.9) (2020-11-25)

### Bug Fixes

- more styling fixes ([bd4d00d](https://github.com/sajari/sdk-react/commit/bd4d00de6dd42066b3751d4cf3c90c41239286a8))

# [1.0.0-alpha.8](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.7...sajari-sdk-docs@1.0.0-alpha.8) (2020-11-25)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-alpha.7](https://github.com/sajari/sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.6...sajari-sdk-docs@1.0.0-alpha.7) (2020-11-24)

### Features

- added ResizeObserver component ([246bec5](https://github.com/sajari/sdk-react/commit/246bec5164d39c6a6a6bb27903d0690aa83b43f5))

# [1.0.0-alpha.6](https://github.com/sajari/sajari-sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.5...sajari-sdk-docs@1.0.0-alpha.6) (2020-11-20)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-alpha.5](https://github.com/sajari/sajari-sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.4...sajari-sdk-docs@1.0.0-alpha.5) (2020-11-18)

**Note:** Version bump only for package sajari-sdk-docs

# [1.0.0-alpha.4](https://github.com/sajari/sajari-sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.3...sajari-sdk-docs@1.0.0-alpha.4) (2020-11-17)

### Bug Fixes

- dropdown result item style tweaks ([52cb4a3](https://github.com/sajari/sajari-sdk-react/commit/52cb4a3582b84ad9c46af328ba0e2596ca6f28ff))

### Features

- updated props for Filter component ([#227](https://github.com/sajari/sajari-sdk-react/issues/227)) ([b44e7f2](https://github.com/sajari/sajari-sdk-react/commit/b44e7f294fa64033bdc04bd8a0414387e2b702ea))

# [1.0.0-alpha.3](https://github.com/sajari/sajari-sdk-react/compare/sajari-sdk-docs@1.0.0-alpha.2...sajari-sdk-docs@1.0.0-alpha.3) (2020-11-16)

**Note:** Version bump only for package sajari-sdk-docs

## 0.0.1 (xxxx-xx-xx)

**Note:** TBD
