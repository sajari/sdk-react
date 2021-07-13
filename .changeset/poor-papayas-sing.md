---
'@sajari/react-hooks': patch
'sajari-sdk-docs': patch
'@sajari/react-search-ui': patch
---

Update `useRangeFilter` reset method to follow the change of `RangeFilterBuilder` reset as setting the filter to `null` is equivalent to setting the filter to `[min, max]`. Also, remove the redundant `aggregateReset`.
