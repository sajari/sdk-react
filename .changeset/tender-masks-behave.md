---
'@sajari/react-hooks': patch
'@sajari/react-search-ui': patch
---

Fixed the issue when using the range filter will sometimes cause mismatches between the UI and the response. Previously, the attempt was to retain the previous range values once a new request was made, but it is tricky and often leads to the issues mentioned earlier. The change aims to simplify the logic:

- Only update the `min` and `max` from the response if the query was changed.
- Once the `min` and `max` changed, set the range to `[min, max]`.
