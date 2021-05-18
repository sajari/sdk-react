---
'@sajari/react-hooks': patch
'@sajari/react-search-ui': patch
---

Previously, changing query will remove range filters from the search request via the `reset` function but the update in https://github.com/sajari/sdk-react/commit/66761119165a94ec3a779e0c651ecfb77406dcba was causing the range filters to appear in the request so the return values of aggregate min and max are incorrect.
