---
'sajari-sdk-docs': patch
'@sajari/react-hooks': patch
'@sajari/react-search-ui': patch
---

Allow `resetFilters` to optionally not emit subscribing events of filters. It is useful when we want to reset all filters to their default value but don't want to trigger a search request.
