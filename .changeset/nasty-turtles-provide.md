---
'sajari-sdk-docs': minor
'@sajari/react-hooks': minor
'@sajari/react-search-ui': minor
---

**Motivation**: It’s super useful to have the search UI state synchronizing with the browser URL and we had the functionality internally developed in the search widgets. However, when users build the search UI with React SDK (or JS SDK), they have to develop the feature by themselves and the work could be challenging even for an experienced developer. Thus, the goal of the change is to have the sync URLs functionality as a generic solution in the React SDK so it can be easily used by both our internal development (search-widgets, demo,…) and the outside world.

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
