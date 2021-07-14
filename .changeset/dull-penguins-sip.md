---
'@sajari/react-search-ui': patch
'sajari-sdk-docs': patch
---

Fix typing in the `Input` will lose focus if it clears the selected items in a list filter. It was because it aims to re-focus on the last selected item once the selected state changed, but since the selected state can be changed by typing on the search input, it will move the focus onto the last selected checkbox.
