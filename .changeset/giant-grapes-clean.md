---
'@sajari/react-hooks': major
'@sajari/react-search-ui': major
---

Update ResultClickedFn to receive more info

Before:

```js
pipeline.listen('result-clicked', (url) => {
  console.log(url);
});
```

After:

```js
pipeline.listen('result-clicked', (data) => {
  const {
    token,
    values: { id, internalId, url, title, subtitle, description, image, price, originalPrice, rating },
  } = data;
  console.log(token);
});
```
