---
'@sajari/react-search-ui': patch
---

Fix the output of `mergeBannersWithResults` will contain `undefined` value if there is a banner having a position being greater than the total number of banners and results. The `undefined` value will cause the check of `isBanner` method to break and cause the app to crash.
