# bem-it

A simple js object providing BEM class naming support and consistency for an individual or software team.
Provides consistent BEM class names, and a clean api that doesn't bloat a component with untidy string concatenations.

The code has been thoroughly tested and test scripts are available, with source, in the npm-utils project in
[github](https://github.com/gtechdoodler/npm-utils). If you discover any bugs then
[please report](https://github.com/gtechdoodler/npm-utils/issues). Thank you :).


## Installation

Install from [npm](https://www.npmjs.com/):

```sh
npm install @gtechdoodler/bem-it
```


## How to Use

The examples provided are implemented in a React functional component...

Start by importing the BemIt object into your component, then create a new instance passing your
component name to the constructor.

```js
import React from 'react';
import BemIt from '@gtechdoodler/bem-it';

export default function() {
  const bem = new BemIt('Container');

  return (
    <div className={bem.out}>
    </div>
  )
}
```

Calling `bem.out` will output: **Container**

You always call `.out` to output the class name value. Calling `.out`
also flushes the bem object, ensuring it's in a clean state, ready for your next statement.


### Adding a Child Element

The examples from this point on, will include only the component, omitting the import statements. 

```js
export default function() {
  const bem = new BemIt('Container');

  return (
    <div className={bem.out}>
      <div className={bem.el('content').out}>
      </div>
    </div>
  )
}
```

Calling `bem.el('content').out` will output: **Container__content**


### Adding a Modifier to That Child Element

```js
export default function() {
  const bem = new BemIt('Container');

  return (
    <div className={bem.out}>
      <div className={bem.el('content').mod('show').out}>
      </div>
    </div>
  )
}
```

Calling `bem.el('content').mod('show').out` will output: **Container__content Container__content--show**

Notice we are following the official [BEM](http://getbem.com/) standard here, outputting the Block__element and an
additional Block__element--modifier to represent the modifier.


### Multiple Classes With a Single Statement

If you really must represent an element with mutiple class names, this is achieveable with chaining. Just call `and`.

```js
export default function() {
  const bem = new BemIt('Container');

  return (
    <div className={bem.out}>
      <div className={bem.el('content').and.el('detail').out}>
      </div>
    </div>
  )
}
```

Calling `bem.el('content').and.el('detail').out` will output: **Container__content Container__detail**


## TypeScript Declarations

These are exported, so if you're using TypeScript then have a play around... the api is light and most of it is
chainable. So, if you want something wacky like:

`bem.el('content').mod('show').and.el('content').el('summary').mod('highlight').out`

then it will work. It really isn't recommended, but it will work. By the way, that would output:

**Container__content Container__content--show Container__content__summary Container__content__summary--highlight**