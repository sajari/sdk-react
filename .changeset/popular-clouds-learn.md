---
'@sajari/react-search-ui': patch
---

Remove `resetFilters` when calling autocomplete search. This trigger of the method is not only unnecessary, but it also introduces a mess in SearchContext to override the input value.
