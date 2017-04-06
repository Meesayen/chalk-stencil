Chalk Stencil
===============

> The tagged template literal for colorful command line outputs that you didn't know you needed!

[![asciicast](https://asciinema.org/a/7yrb3royn7zvf689e85qaicz9.png)](https://asciinema.org/a/7yrb3royn7zvf689e85qaicz9)

### Install

```bash
$ npm install --save chalk-stencil

# or

$ yarn add chalk-stencil
```

### Usage

You can create a colorful template using all the [Chalk][1]'s available styles:

```js
const chalk = require('chalk-stencil')
const msg = chalk`This ${'text::red'} is going to be red,
  and this ${'one::yellow'} yellow`

console.log(msg({ text: 'text', one: 'other text' }))
```

### Features

#### Multiple props
As seen above, you can create a template that accepts multiple properties, each one with its own style.

```js
chalk`This ${'text::red'} is going to be red,
  and this ${'one::yellow'} yellow`
```

This will return a template function which will accept an object which properties will be used to fill the placeholders.

#### Style chaining
You can also chain multiple styles for each property:

```js
chalk`Red, white background and bold ${'prop1::red.bgWhite.bold'},
  cyan underlined ${'prop2::cyan.underline'}`
```

#### Default style
You may want to give a default style to a whole template, well, you can by adding the `::<style>` at the very end of the string:

```js
const errorMsg = chalk`Error: The ${'errorOrigin::underline.cyan'}
  exploded with the power of a thousand rainbows!::red`

console.error(errorMsg({ errorOrigin: 'Spaceship' }))
```

#### Unstyled template
You can even use this as a simple templating system, without styles; just drop the `::<style>` part:

```js
const msg = chalk`Just a ${'prop1'} with ${'prop2'}`
console.log(msg({ prop1: 'simple template', prop2: 'no style' }))
// = Just a simple template with no style
```

#### Plain values
You can also use the special `_` key, to pass in simple values, instead of objects:

```js
const tpl = chalk`I just want this ${'_::magenta'} to be magenta`

tpl('thing')
// = I just want this thing to be magenta
//                    ^^^^^ magenta
tpl(42)
// I just want this 42 to be magenta
//                  ^^ magenta
```

#### Raw strings
You can use raw strings as well, it Just Works:

```js
chalk`The following ${'text will be colored::magenta'}.`
```

#### Simple usage
The `chalk-stencil` tagged literal will always return a function, so that you can pass properties
to it, but you can also use it as if it was a plain tag:

```js
console.log(chalk`I'm going to ${'rock::green'} tonight.::bold`)
// = I'm going to rock tonight.
//                ^^^^ green, everything bold
// note how you don't have to "call" the function at the end
// i.e. no chalk`something`() to produce the actual string
```

### Related

Chalk: [chalk][1]


[1]: https://github.com/chalk/chalk
