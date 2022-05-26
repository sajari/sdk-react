# Change Log

## 3.13.2

### Patch Changes

- [`c235dcc6`](https://github.com/sajari/sdk-react/commit/c235dcc6ded4e2e0d3b358796c2f0696e33359dd) [#808](https://github.com/sajari/sdk-react/pull/808) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix initial value for a filter will be overridden to an empty value if the URL param doesn't exist

## 3.13.1

### Patch Changes

- [`05105918`](https://github.com/sajari/sdk-react/commit/051059186af08bfbbaaf9680e131c8d26332aeb0) [#803](https://github.com/sajari/sdk-react/pull/803) Thanks [@zlatanpham](https://github.com/zlatanpham)! - There are no changes in the version bump. This aims to release the most recent update in the hooks package when the version 3.13.0 failed to be published by changeset.

* [`1e7ee9b2`](https://github.com/sajari/sdk-react/commit/1e7ee9b2b3f2b0f18d8fc51a81075a1a0b68fb18) [#802](https://github.com/sajari/sdk-react/pull/802) Thanks [@wwalser](https://github.com/wwalser)! - chore: bump version of sdk-js used in order to get access to new bug fixes

## 3.13.0

### Minor Changes

- [`0e0e4712`](https://github.com/sajari/sdk-react/commit/0e0e4712c0d5097476eb71fd562f077783d1b36e) [#794](https://github.com/sajari/sdk-react/pull/794) Thanks [@zlatanpham](https://github.com/zlatanpham)! - **Motivation**: It’s super useful to have the search UI state synchronizing with the browser URL and we had the functionality internally developed in the search widgets. However, when users build the search UI with React SDK (or JS SDK), they have to develop the feature by themselves and the work could be challenging even for an experienced developer. Thus, the goal of the change is to have the sync URLs functionality as a generic solution in the React SDK so it can be easily used by both our internal development (search-widgets, demo,…) and the outside world.

  ### API proposal

  The `URLStateSync` should be placed inside the `SearchProvider`. It will work out of box with any UI that consumes data from our hook components.

  ```jsx
  <SearchProvider {...}>
    <URLStateSync />
    <YourSearchUI />
  </SearchProvider>
  ```

  By default, it supports state sync for the core params including `q`, `filters`, `sort` and `resultsPerPage` but we can extend other options via `extendedParams` prop:

  ```jsx
  const defaultViewType = 'list';
  const [viewType, setViewType] = useState(defaultViewType);

  <SearchProvider {...}>
    <URLStateSync />
    <YourSearchUI
       extendedParams={[
          {
            key: 'viewType',
            value: viewType,
            defaultValue: defaultViewType,
            callback: setViewType,
          },
        ]}
     />
  </SearchProvider>
  ```

## 3.12.0

### Minor Changes

- [`b7c398a8`](https://github.com/sajari/sdk-react/commit/b7c398a85fa6524cc3d49af3b9f670729aa89775) [#784](https://github.com/sajari/sdk-react/pull/784) Thanks [@JasonBerry](https://github.com/JasonBerry)! - feat: add ability to pass custom SearchIOAnalytics instance to EventTracking

## 3.11.1

### Patch Changes

- [`ec185f6b`](https://github.com/sajari/sdk-react/commit/ec185f6bacf9550f6439ec7ea9589211b5bb183f) [#781](https://github.com/sajari/sdk-react/pull/781) Thanks [@JasonBerry](https://github.com/JasonBerry)! - chore: bumped version of sdk-js used by hooks

## 3.11.0

### Minor Changes

- [`b16ac53c`](https://github.com/sajari/sdk-react/commit/b16ac53c14f36d11e88164cd11beeaafec086c64) [#772](https://github.com/sajari/sdk-react/pull/772) Thanks [@JasonBerry](https://github.com/JasonBerry)! - Add tracking field to useTracking hook

## 3.10.1

### Patch Changes

- [`8e2c6a08`](https://github.com/sajari/sdk-react/commit/8e2c6a081431b697d23cf99ca219da1dee79acc7) [#768](https://github.com/sajari/sdk-react/pull/768) Thanks [@JasonBerry](https://github.com/JasonBerry)! - Correct React peer dependency versioning

- Updated dependencies [[`8e2c6a08`](https://github.com/sajari/sdk-react/commit/8e2c6a081431b697d23cf99ca219da1dee79acc7)]:
  - @sajari/react-sdk-utils@1.6.4

## 3.10.0

### Minor Changes

- [`a4816979`](https://github.com/sajari/sdk-react/commit/a481697922c18cec57317dd7323349ec94d788d6) [#753](https://github.com/sajari/sdk-react/pull/753) Thanks [@JasonBerry](https://github.com/JasonBerry)! - Add EventTracking for simplified event tracking

## 3.9.0

### Minor Changes

- [`e9ae8692`](https://github.com/sajari/sdk-react/commit/e9ae8692e8136d954b0146d703a61cdd1cf7ad2b) [#731](https://github.com/sajari/sdk-react/pull/731) Thanks [@chidojiro](https://github.com/chidojiro)! - Integrate banners into useSearch

## 3.8.0

### Minor Changes

- [`2ffb06f9`](https://github.com/sajari/sdk-react/commit/2ffb06f9ca870982760dcaab710eacce3d75f89c) [#717](https://github.com/sajari/sdk-react/pull/717) Thanks [@wwalser](https://github.com/wwalser)! - feat: thread featureScoreWeight, featureScore and neuralScore through from search queries

## 3.7.0

### Minor Changes

- [`3d61fbee`](https://github.com/sajari/sdk-react/commit/3d61fbee55e3afc4d0cc121850445d0709185f02) [#704](https://github.com/sajari/sdk-react/pull/704) Thanks [@jkaho](https://github.com/jkaho)! - Make activePromotions accessible via search hooks

## 3.6.1

### Patch Changes

- [`963b4d5b`](https://github.com/sajari/sdk-react/commit/963b4d5b0683a09a08d1047747bfb36dfb4ca923) [#695](https://github.com/sajari/sdk-react/pull/695) Thanks [@wwalser](https://github.com/wwalser)! - fix: avoid sending range filter when min and max values are set to the min and max of the collection

## 3.6.0

### Minor Changes

- [`1069d938`](https://github.com/sajari/sdk-react/commit/1069d93883c998d7b10129565cb0d915d7d99b08) [#684](https://github.com/sajari/sdk-react/pull/684) Thanks [@wwalser](https://github.com/wwalser)! - fix: bug fix for handling of redirect returned in autocomplete pipelines

### Patch Changes

- Updated dependencies [[`1069d938`](https://github.com/sajari/sdk-react/commit/1069d93883c998d7b10129565cb0d915d7d99b08)]:
  - @sajari/react-sdk-utils@1.6.2

## 3.5.1

### Patch Changes

- [`506677e7`](https://github.com/sajari/sdk-react/commit/506677e75e93f24f39641b84d82ee558bed1483f) [#682](https://github.com/sajari/sdk-react/pull/682) Thanks [@wwalser](https://github.com/wwalser)! - feat: better handling of redirects

- Updated dependencies [[`506677e7`](https://github.com/sajari/sdk-react/commit/506677e75e93f24f39641b84d82ee558bed1483f)]:
  - @sajari/react-sdk-utils@1.6.1

## 3.5.0

### Minor Changes

- [`dcd39d99`](https://github.com/sajari/sdk-react/commit/dcd39d99115d3eae5cb375a8f2b2480eff2348a1) [#680](https://github.com/sajari/sdk-react/pull/680) Thanks [@wwalser](https://github.com/wwalser)! - feat: implement redirects across all relevant components

### Patch Changes

- Updated dependencies [[`dcd39d99`](https://github.com/sajari/sdk-react/commit/dcd39d99115d3eae5cb375a8f2b2480eff2348a1)]:
  - @sajari/react-sdk-utils@1.6.0

## 3.4.1

### Patch Changes

- [`f3fb3c7b`](https://github.com/sajari/sdk-react/commit/f3fb3c7bbfaff19a020f25a6b4f3b0abf7e99f47) [#674](https://github.com/sajari/sdk-react/pull/674) Thanks [@wwalser](https://github.com/wwalser)! - perf: improved performance of useFilter to account for very large option data sets

## 3.4.0

### Minor Changes

- [`70bba80a`](https://github.com/sajari/sdk-react/commit/70bba80ab5206ba0e5dd44e5c02af11705bf997d) [#658](https://github.com/sajari/sdk-react/pull/658) Thanks [@jkaho](https://github.com/jkaho)! - feat: export `PosNegLocalStorageManager` from hooks/search-ui, add class to docs

* [`70bba80a`](https://github.com/sajari/sdk-react/commit/70bba80ab5206ba0e5dd44e5c02af11705bf997d) [#658](https://github.com/sajari/sdk-react/pull/658) Thanks [@jkaho](https://github.com/jkaho)! - feat: sajari/react-hooks now exports a utility class for managing posneg tokens PosNegLocalStorageManager

## 3.3.2

### Patch Changes

- [`eb1074c8`](https://github.com/sajari/sdk-react/commit/eb1074c8aa7eaddcac4389f32d60ba85ff108dbc) [#632](https://github.com/sajari/sdk-react/pull/632) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix missing `Tracking` and `NoTracking` export.

## 3.3.1

### Patch Changes

- [`47c5edc8`](https://github.com/sajari/sdk-react/commit/47c5edc863229923bc8277d47f55db643fb714b6) [#630](https://github.com/sajari/sdk-react/pull/630) Thanks [@wwalser](https://github.com/wwalser)! - chore: bumpped version of utils used by hooks

## 3.3.0

### Minor Changes

- [`4a2c7523`](https://github.com/sajari/sdk-react/commit/4a2c7523eeb5d54776f6b971e0558e34eaf5a436) [#599](https://github.com/sajari/sdk-react/pull/599) Thanks [@wwalser](https://github.com/wwalser)! - feat: added out-of-the-box support for posnegtracking

## 3.2.1

### Patch Changes

- [`5fb0a7f0`](https://github.com/sajari/sdk-react/commit/5fb0a7f0008f7b96a6257c6d35cb41ba1496ec2c) [#583](https://github.com/sajari/sdk-react/pull/583) Thanks [@wwalser](https://github.com/wwalser)! - chore: slight code quality problem missed in code review

- Updated dependencies [[`5fb0a7f0`](https://github.com/sajari/sdk-react/commit/5fb0a7f0008f7b96a6257c6d35cb41ba1496ec2c)]:
  - @sajari/react-sdk-utils@1.3.17

## 3.2.0

### Minor Changes

- [`dd9a8790`](https://github.com/sajari/sdk-react/commit/dd9a8790bd763246b754ec016ffce2ddfccfebb6) [#581](https://github.com/sajari/sdk-react/pull/581) Thanks [@wwalser](https://github.com/wwalser)! - feat: support custom clicktracking url so we can test in non-prod environments

### Patch Changes

- Updated dependencies [[`dd9a8790`](https://github.com/sajari/sdk-react/commit/dd9a8790bd763246b754ec016ffce2ddfccfebb6)]:
  - @sajari/react-sdk-utils@1.3.16

## 3.1.1

### Patch Changes

- [`995c5117`](https://github.com/sajari/sdk-react/commit/995c5117e9a053a79dc6638b02243b60b155a6ae) [#576](https://github.com/sajari/sdk-react/pull/576) Thanks [@wwalser](https://github.com/wwalser)! - Updated dependencies in order to create a more reliable build. This should have no runtime side effects but because it alters dependencies it felt best to do a patch version bump.

- Updated dependencies [[`6f34914a`](https://github.com/sajari/sdk-react/commit/6f34914ae92f850f7009bbbbb2c661217deaf632), [`995c5117`](https://github.com/sajari/sdk-react/commit/995c5117e9a053a79dc6638b02243b60b155a6ae)]:
  - @sajari/react-sdk-utils@1.3.15

## 3.1.0

### Minor Changes

- [`13d289b0`](https://github.com/sajari/sdk-react/commit/13d289b04b0be753895371f610181b7f65bc858e) [#525](https://github.com/sajari/sdk-react/pull/525) Thanks [@tuanddd](https://github.com/tuanddd)! - Add status to result

### Patch Changes

- [`00300224`](https://github.com/sajari/sdk-react/commit/0030022497ca8dd566ddfb30fef8f7088de98fc4) [#564](https://github.com/sajari/sdk-react/pull/564) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Include `fields:''` in the body request to always expect `_id` to be in the response. It's necessary, otherwise, it could break the re-render process of Results where the `key` relies on the `_id`.

## 3.0.3

### Patch Changes

- [`218e3702`](https://github.com/sajari/sdk-react/commit/218e3702c53dffc0db71697b9606e341177522d8) [#558](https://github.com/sajari/sdk-react/pull/558) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix the reset button on a list filter doesn't show correctly.

- Updated dependencies [[`218e3702`](https://github.com/sajari/sdk-react/commit/218e3702c53dffc0db71697b9606e341177522d8)]:
  - @sajari/react-sdk-utils@1.3.13

## 3.0.2

### Patch Changes

- [`dfde14e1`](https://github.com/sajari/sdk-react/commit/dfde14e19d61f3fe0ccf23fdc14148f7e8c5b519) [#548](https://github.com/sajari/sdk-react/pull/548) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Update `useRangeFilter` reset method to follow the change of `RangeFilterBuilder` reset as setting the filter to `null` is equivalent to setting the filter to `[min, max]`. Also, remove the redundant `aggregateReset`.

## 3.0.1

### Patch Changes

- [`8c1991b5`](https://github.com/sajari/sdk-react/commit/8c1991b5aa0fe441d69c5fe6906bb44dfcf0df6b) [#546](https://github.com/sajari/sdk-react/pull/546) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix missing `arraysEqual` in `@sajari/react-sdk-utils` package.

- Updated dependencies [[`8c1991b5`](https://github.com/sajari/sdk-react/commit/8c1991b5aa0fe441d69c5fe6906bb44dfcf0df6b)]:
  - @sajari/react-sdk-utils@1.3.12

## 3.0.0

### Major Changes

- [`5f7d49ec`](https://github.com/sajari/sdk-react/commit/5f7d49ec80492d5ed6cb950dc237d1d9f30c8833) [#543](https://github.com/sajari/sdk-react/pull/543) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Clear filters when a user performs a new search.

## 2.3.0

### Minor Changes

- [`35e9877e`](https://github.com/sajari/sdk-react/commit/35e9877e41885aef6f22bc3a09afd2e03a885732) [#540](https://github.com/sajari/sdk-react/pull/540) Thanks [@wwalser](https://github.com/wwalser)! - Bumping react-hooks in order to add the recent salePrice addition to it's package as expected

## 2.2.1

### Patch Changes

- [`88f732f3`](https://github.com/sajari/sdk-react/commit/88f732f3c74fdf91056c4bfa4b2d229529783984) [#533](https://github.com/sajari/sdk-react/pull/533) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix passing a custom `config` object doesn't work.

## 2.2.0

### Minor Changes

- [`e9a804ef`](https://github.com/sajari/sdk-react/commit/e9a804ef24239b79b1a30e14f688144b5bdd243f) [#514](https://github.com/sajari/sdk-react/pull/514) Thanks [@tuanddd](https://github.com/tuanddd)! - Show product's variant images if any

### Patch Changes

- [`f71b2ab5`](https://github.com/sajari/sdk-react/commit/f71b2ab537ebcf027b49d2bb153080083bcc393c) [#523](https://github.com/sajari/sdk-react/pull/523) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Fix missing type exports in Variables.

## 2.1.0

### Minor Changes

- [`ab4acfaf`](https://github.com/sajari/sdk-react/commit/ab4acfaf24a5a86fb55f73f9061a3e69160576b4) [#515](https://github.com/sajari/sdk-react/pull/515) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Allow `setSorting` to call without running search.

## 2.0.0

### Major Changes

- [`d2caf2bf`](https://github.com/sajari/sdk-react/commit/d2caf2bf00f0933416ba399d786c06182abcc56d) [#506](https://github.com/sajari/sdk-react/pull/506) Thanks [@tuanddd](https://github.com/tuanddd)! - Update ResultClickedFn to receive more info

  Before:

  ```js
  pipeline.listen('result-clicked', url => {
    console.log(url);
  });
  ```

  After:

  ```js
  pipeline.listen('result-clicked', data => {
    const {
      token,
      values: { id, url, title, subtitle, description, image, price, originalPrice, rating },
    } = data;
    console.log(token);
  });
  ```

## 1.5.0

### Minor Changes

- [`5b9fea54`](https://github.com/sajari/sdk-react/commit/5b9fea5412776a5b0d342d2e7ea2a55ac203323f) [#505](https://github.com/sajari/sdk-react/pull/505) Thanks [@tuanddd](https://github.com/tuanddd)! - Allow callers to override the metadata when creating tracking objects

  Before:

  ```js
  new PosNegTracking('url');

  new ClickTracking('url', 'q');
  ```

  After:

  ```js
  new PosNegTracking('url', { foo: 'bar', ... })

  new ClickTracking('url', 'q', { foo: 'bar', ... })
  ```

## 1.4.16

### Patch Changes

- [`c33fa083`](https://github.com/sajari/sdk-react/commit/c33fa08321057c5b97eb5045bb59c3e62ea8a41a) [#508](https://github.com/sajari/sdk-react/pull/508) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Support `includes`, `excludes` and `prefixFilter` for `useFilter`.

- Updated dependencies [[`8c9c758f`](https://github.com/sajari/sdk-react/commit/8c9c758fc563494f91ef28f323c5fd2edf84359d)]:
  - @sajari/react-sdk-utils@1.3.10

## 1.4.15

### Patch Changes

- [`84614dea`](https://github.com/sajari/sdk-react/commit/84614dea19003daff3ce755a97e386db39d5b0c0) [#498](https://github.com/sajari/sdk-react/pull/498) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Previously, changing query will remove range filters from the search request via the `reset` function but the update in https://github.com/sajari/sdk-react/commit/66761119165a94ec3a779e0c651ecfb77406dcba was causing the range filters to appear in the request so the return values of aggregate min and max are incorrect.

## 1.4.14

### Patch Changes

- [`7dbf22ab`](https://github.com/sajari/sdk-react/commit/7dbf22abefd698a3601fcc9cdc117d7d11f7877b) [#491](https://github.com/sajari/sdk-react/pull/491) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Allow `resetFilters` to optionally not emit subscribing events of filters. It is useful when we want to reset all filters to their default value but don't want to trigger a search request.

## 1.4.13

### Patch Changes

- [`66761119`](https://github.com/sajari/sdk-react/commit/66761119165a94ec3a779e0c651ecfb77406dcba) [#490](https://github.com/sajari/sdk-react/pull/490) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Add support `reset` all filters method.

* [`2fc33184`](https://github.com/sajari/sdk-react/commit/2fc33184d950aaec616a80c24d7a5fa8a9963806) [#485](https://github.com/sajari/sdk-react/pull/485) Thanks [@tuanddd](https://github.com/tuanddd)! - Fix array match empty value where if using a FilterBuilder with the `group` option and not having any options selected the filter will produce a false string (`ARRAY_MATCH()` instead of `''`)

## 1.4.12

### Patch Changes

- [`14ab3300`](https://github.com/sajari/sdk-react/commit/14ab33007b3fdb349546ad650b39cbcdba7e66d6) [#464](https://github.com/sajari/sdk-react/pull/464) Thanks [@tuanddd](https://github.com/tuanddd)! - Revert https://github.com/sajari/sdk-react/pull/460 since it causes empty results on search with an interface having a price filter.

## 1.4.11

### Patch Changes

- [`a610c50a`](https://github.com/sajari/sdk-react/commit/a610c50aefef1b751c4243421fcbd179014f97d8) [#460](https://github.com/sajari/sdk-react/pull/460) Thanks [@zlatanpham](https://github.com/zlatanpham)! - Support reset all filters functionality by exporting `reset` method from `useSearchContext`.

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
