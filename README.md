# Lit Console
Slow but convenient browser color log function using Tagged templates syntax. 16 color support.


### [Demo](https://codesandbox.io/s/lit-console-dfcni?file=/src/index.js)
![lit-console](https://i.imgur.com/c2aCVGV.jpg)


## Install
```bash
npm i lit-console
```

## Usage

String types must first be wrapped in a backtic and entered, and non-string types must be enclosed in parentheses.
```js
import log from 'lit-console';

log`This is a simple sentence.`(true);
// This is a simple sentence. true
```

The values in the parentheses are passed to the parameters of `window.console.log`.
```js
log`value: `({a: 1, b: 2, c: 3});
// value: {a: 1, b: 2, c: 3}
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

If you want to use window.console.log, call without backtick.
```js
log('I want just', 'console.log');
```

To add color methods, you must create a new log function. In the parameter of the createLog function, entering an object(key is the method name, value is the style to apply), creates a log function with a new color method.
```js
import {createLog} from 'lit-console';

const customLog = createLog({
  i: 'font-style: italic;',
  strong: 'font-weight: bold;',
  u: 'text-decoration: underline;',
  through: 'text-decoration: line-through;',
  label: 'background: #3547d1; color: white; padding: 2px 7px; border-radius: 5px',
});

customLog.label`TEST``Hello world!`();

// TEST Hello world! 🤩
```

## Notes
- It is four to five times slower than `console.log`. I think it will be difficult to improve the speed significantly.
- More style and custom style features will be added.
- Confirmed to support Chrome(87.0.4280.141), Edge(87.0.664.75), Firefox(85.0b8), Opera(73.0.3856.329).

### Enjoy 😎