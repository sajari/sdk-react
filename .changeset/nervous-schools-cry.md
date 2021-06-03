---
'@sajari/react-hooks': major
---

Allow for passing in object as second parameter when using tracking constructors

Before:

```js
new PosNegTracking('url');

new ClickTracking('url', 'q');
```

After:

```js
new PosNegTracking('url', { qParam: 'q', foo: 'bar', ... })

new ClickTracking('url', 'q', { foo: 'bar', ... })
```
