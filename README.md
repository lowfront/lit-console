# Lit Console
Slow but convenient browser color log function using Tagged templates syntax. 16 color support.

![lit-console](https://i.imgur.com/c2aCVGV.jpg)

## Install
```bash
npm i lit-console
```

## Usage

String types must first be wrapped in a backtic and entered, and non-string types must be enclosed in parentheses.
```js
log`This is a simple sentence.`(true);
// This is a simple sentence. true
```

Call if only use the string type.
```js
log`This is a simple sentence.`();
// This is a simple sentence.
```

Using the Template literals syntax, the input values are cast as string.
```js
// warning
log`JSON ${{a: 1, b: 2, c: 3}}`();
// JSON [object Object]
```

You can use the specified color method when entering a color. All calls using the tagged template syntax are chained until parentheses are used.
```js
log.G` 1. SUCCESS ``or`.R` 2. FAIL ``result:`(Math.round(Math.random()) + 1);
//1. SUCCESS  or 2. FAIL  result: 1
```

## Notes
- It is four to five times slower than `console.log`. I think it will be difficult to improve the speed significantly.
- More style and custom style features will be added.
- Confirmed to support Chrome(87.0.4280.141), Edge(87.0.664.75), Firefox(85.0b8), Opera(73.0.3856.329).

### Enjoy 😎