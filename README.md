# Debug

Licence: [MIT](https://opensource.org/licenses/MIT).

---

[![npm version](https://badge.fury.io/js/%40superhero%2Fdebug.svg)](https://badge.fury.io/js/%40superhero%2Fdebug)

A debug utility for pretty output..

## Install

`npm install @superhero/debug`

...or just set the dependency in your `package.json` file:

```json
{
  "dependencies":
  {
    "@superhero/debug": "*"
  }
}
```

## Example

```javascript
const debug = require('@superhero/debug')(/* options */);
debug('debug:', {foo:'bar', baz:'qux'});
```

## Options

All options are optional.

```javascript
{
  // if false, no output is made.
  debug: true,

  // depth of object inspection.
  depth: 10,

  // define a desired color of the output
  // [black, blue, cyan, green, magenta, red, yellow, white]
  color: undefined,

  // if false, output wont be colored
  colors: true,

  // a prefixed keyword to define the output
  prefix: 'debug:'
}
```
