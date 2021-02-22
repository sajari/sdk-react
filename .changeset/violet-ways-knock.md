---
'@sajari/react-components': patch
'@sajari/react-search-ui': patch
---

Fixed tabs are unclickable because the ref DOM node from `cloneElement` sometimes gets `null`.
