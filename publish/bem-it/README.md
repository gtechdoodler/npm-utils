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


### Multiple Modifiers as Array

For ternary operand false, pass an empty string, undefined, or null. This will ensure the exclusion of the modifier.

```js
export default function({isFullScreen, isLoading, ...props}) {
  const bem = new BemIt('Container');
  const className = bem.mod([
    isFullScreen ? 'full-screen' : '',
    isLoading ? 'loading' : ''
  ]).out;

  return (
    <div className={className}>
    </div>
  )
}
```


### Multiple Modifiers as Object

Anything falsy will be ignored.

```js
export default function({isFullScreen, isLoading, ...props}) {
  const bem = new BemIt('Container');
  const className = bem.mod({
    'full-screen' isFullScreen,
    'loading': isLoading
  }).out;

  return (
    <div className={className}>
    </div>
  )
}
```


### Include a Custom Class Name Passed as a Prop

To combine a class name passed as a prop, with bem output, you can import a function called `addClass`.

```js
import BemIt, { addClass } from '@gtechdoodler/bem-it';
```

And implement as follows:

```js
export default function({className, ...props}) {
  const bem = new BemIt('Container');

  return (
    <div className={addClass(className).before(bem)}>
    </div>
  )
}
```

If the className is falsy then it will be ignored, outputting only the bem class name. Also, you can flip the
class names around, adding a custom class after a bem output, by calling `addClass(className).after(bem)`.


### Multiple Classes With a Single Statement

If you really must represent an element with mutiple class names, this is achieveable with chaining. Call `and`.

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

These are exported, so if you're using TypeScript then have a play around... the api is light and chainable,
so, if you want something wacky like:

`bem.el('content').mod('show').and.el('content').el('summary').mod('highlight').out`

But please don't write code like this :).