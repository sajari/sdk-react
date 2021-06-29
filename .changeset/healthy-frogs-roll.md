---
'@sajari/react-search-ui': patch
'sajari-sdk-docs': patch
---

Fix `capitalize` utility works incorrectly, where a string in uppercase letters is not converted to a capitalized output. For example, `hELLO` is converted to `HELLO` instead of `Hello`.
