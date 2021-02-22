---
'@sajari/react-hooks': patch
'@sajari/react-search-ui': patch
---

Fixed the issue of incorrect response after using filters. It was caused by the `filter()` method of a count aggregate filter will ignore the value that is not in the options.
