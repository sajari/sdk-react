---
'sajari-sdk-docs': patch
'@sajari/react-hooks': patch
'@sajari/react-search-ui': patch
---

Include `fields:''` in the body request to always expect `_id` to be in the response. It's necessary, otherwise, it could break the re-render process of Results where the `key` relies on the `_id`.
