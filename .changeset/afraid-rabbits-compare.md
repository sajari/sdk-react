---
'@sajari/react-components': patch
'@sajari/react-sdk-utils': patch
'sajari-sdk-docs': patch
'@sajari/react-search-ui': patch
---

Fix the issue when the footer of the modal gets hidden on iPad. It was because we used `vh` to limit the max height of the modal content but on mobile browsers, the bottom bar is not part the the `100vh` height so the bottom UI will be cut off when the address bar is visible. For more details, see https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html.
