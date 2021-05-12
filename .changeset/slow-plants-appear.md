---
'@sajari/react-hooks': patch
---

Fix array match empty value where if using a FilterBuilder with the `group` option and not having any options selected the filter will produce a false string (`ARRAY_MATCH()` instead of `''`)
