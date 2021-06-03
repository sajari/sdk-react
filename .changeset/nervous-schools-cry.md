---
'@sajari/react-hooks': minor
---

Allow callers to override the metadata when creating tracking objects

Before:

```js
new PosNegTracking('url');

new ClickTracking('url', 'q');
```

After:

```js
new PosNegTracking('url', { foo: 'bar', ... })

new ClickTracking('url', 'q', { foo: 'bar', ... })
```
