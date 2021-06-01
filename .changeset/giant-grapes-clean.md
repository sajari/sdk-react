---
'@sajari/react-hooks': major
'@sajari/react-search-ui': major
---

Update ResultClickedFn to receive more info

Before:
pipeline.listen('result-clicked', data => {
console.log(data) \\ string, the url
})

After:
pipeline.listen('result-clicked', data => {
console.log(data) \\ object, { token: string, values: {...} }
})
