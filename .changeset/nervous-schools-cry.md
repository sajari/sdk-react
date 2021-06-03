---
'@sajari/react-hooks': major
---

Allow for passing in object as second parameter when using tracking constructors

Before:

```js
new ClickTracking('url', 'q');
```

After:

```js
new ClickTracking('url', {qParam: 'q', foo: 'bar', ...})
```
