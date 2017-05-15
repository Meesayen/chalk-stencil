const test = require('ava')
const sinon = require('sinon')
const realChalk = require('chalk')
const chalk = require('../chalk-stencil')

const modifiers = [
  'reset',
  'bold',
  'dim',
  'italic',
  'underline',
  'inverse',
  'hidden',
  'strikethrough'
]

const colors = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray'
]

const bgColors = [
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite'
]

test('All colors tests', t => {
  for (const color of colors) {
    t.is(
      realChalk[color]('string'),
      chalk._colorize(`string::${color}`)
    )
  }
})

test('All modifiers tests', t => {
  for (const mod of modifiers) {
    t.is(
      realChalk[mod]('string'),
      chalk._colorize(`string::${mod}`)
    )
  }
})

test('All background colors tests', t => {
  for (const bgColor of bgColors) {
    t.is(
      realChalk[bgColor]('string'),
      chalk._colorize(`string::${bgColor}`)
    )
  }
})

test('Simple fast tagged literal', t => {
  t.is(
    realChalk.cyan('ciao'),
    String(chalk`ciao::cyan`)
  )
})

test('Simple tagged literal call', t => {
  t.is(
    realChalk.cyan('ciao'),
    chalk`ciao::cyan`()
  )
})

test('Tagged literal call w/ property', t => {
  const greet = 'ciao'
  t.is(
    `${realChalk.cyan(greet)} dude`,
    chalk`${'greet::cyan'} dude`({ greet })
  )
})

test('Tagged literal call w/ property + default', t => {
  const greet = 'ciao'
  t.is(
    realChalk.blue(`${realChalk.cyan(greet)} dude`),
    chalk`${'greet::cyan'} dude::blue`({ greet })
  )
})

test('Tagged literal call w/ special _ prop', t => {
  const greet = 'ciao'
  t.is(
    `${realChalk.cyan(greet)} dude`,
    chalk`${'_::cyan'} dude`(greet)
  )
})

test('Tagged literal call w/ special _ prop + default', t => {
  const greet = 'ciao'
  t.is(
    realChalk.blue(`${realChalk.cyan(greet)} dude`),
    chalk`${'_::cyan'} dude::blue`(greet)
  )
})

test('Tagged literal call w/ colored literal string', t => {
  const greet = 'ciao'
  t.is(
    `${realChalk.cyan(greet)} dude`,
    chalk`${`${greet}::cyan`} dude`()
  )
})

test('Tagged literal call w/ colored literal string + default', t => {
  const greet = 'ciao'
  t.is(
    realChalk.blue(`${realChalk.cyan(greet)} dude`),
    chalk`${`${greet}::cyan`} dude::blue`()
  )
})

test('Tagged literal call w/ colored literal number', t => {
  const n1 = 100
  t.is(
    `${realChalk.cyan(n1)} dude`,
    chalk`${`${n1}::cyan`} dude`()
  )
  const n2 = 0
  t.is(
    `${realChalk.cyan(n2)} dude`,
    chalk`${`${n2}::cyan`} dude`()
  )
})

test('Tagged literal call w/ colored literal number + default', t => {
  const n1 = 100
  t.is(
    realChalk.blue(`${realChalk.cyan(n1)} dude`),
    chalk`${`${n1}::cyan`} dude::blue`()
  )

  const n2 = 0
  t.is(
    realChalk.blue(`${realChalk.cyan(n2)} dude`),
    chalk`${`${n2}::cyan`} dude::blue`()
  )
})

test('Tagged literal call w/ colored literal boolean', t => {
  const trueVal = true
  t.is(
    `${realChalk.cyan(trueVal)} dude`,
    chalk`${`${trueVal}::cyan`} dude`()
  )
  const falseVal = false
  t.is(
    `${realChalk.cyan(falseVal)} dude`,
    chalk`${`${falseVal}::cyan`} dude`()
  )
})

test('Tagged literal call w/ colored literal boolean + default', t => {
  const trueVal = true
  t.is(
    realChalk.blue(`${realChalk.cyan(trueVal)} dude`),
    chalk`${`${trueVal}::cyan`} dude::blue`()
  )

  const falseVal = false
  t.is(
    realChalk.blue(`${realChalk.cyan(falseVal)} dude`),
    chalk`${`${falseVal}::cyan`} dude::blue`()
  )
})

test('Tagged literal call w/ uncolored literal values', t => {
  const boolTrue = true
  const strTruthy = 'ciao'
  const numTruthy = 10
  t.is(
    realChalk.cyan(`bool ${boolTrue} - str ${strTruthy} - num ${numTruthy}`),
    chalk`bool ${boolTrue} - str ${strTruthy} - num ${numTruthy}::cyan`()
  )

  const boolFalse = false
  const strFalsy = ''
  const numFalsy = 0
  t.is(
    realChalk.cyan(`bool ${boolFalse} - str ${strFalsy} - num ${numFalsy}`),
    chalk`bool ${boolFalse} - str ${strFalsy} - num ${numFalsy}::cyan`()
  )
})

test('Should alert on non existent style usage', t => {
  console.warn = sinon.spy()
  chalk`some string::nonColor`()
  t.true(console.warn.calledOnce)
})
