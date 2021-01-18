---
'sajari-sdk-docs': patch
'@sajari/react-hooks': patch
'@sajari/react-search-ui': patch
---

Fix using `useRangeFilter` will trigger an unwanted call of `reset` method in `didMount` phase.
