const chalk = require('chalk')

const colorRE = /::[\w.]+$/

function colorize(chunk) {
  if (!colorRE.exec(chunk)) return chunk
  const [ str, chalkCode ] = chunk.split('::')

  return chalkCode.split('.').reduce((s, style) => {
    if ({}.hasOwnProperty.call(chalk.styles, style)) {
      return chalk[style](s)
    }
    // NOTE - to future self: `warnMsg` is defined at the very bottom. You're welcome.
    console.warn(warnMsg(style))
    return s
  }, str)

  return str
}

const chalkStencil = function chalkStencil(strings, ...keys) {
  const tplFn = (props) => {
    let i = 0
    let resStr = ''
    for (const s of strings) {
      const key = keys[i++]
      if (key === void 0) {
        resStr = `${resStr}${s}`
      } else {
        const [ prop, style ] = key.split('::')
        let val
        if (prop === '_') {
          val = `${props}`
        } else if (prop !== void 0) {
          if (props !== void 0 && props[prop] !== void 0) val = props[prop]
          else val = prop
        } else {
          val = `<missing property>`
        }
        if (style) {
          resStr = `${resStr}${s}${colorize(`${val}::${style}`)}`
        } else {
          resStr = `${resStr}${s}${val}`
        }
      }
    }
    return colorRE.exec(resStr) ? colorize(resStr) : resStr
  }

  // I'm probably a bad person, but this allows for cleaner simple usages like:
  // console.log(chalk`just a simple red message::red`)
  // If someone will ever need to inspect the source code at runtime, it can be done like so:
  // const tpl = chalk`some red stuff::red`
  // Function.prototype.toString.call(tpl)
  tplFn.inspect = () => tplFn()
  tplFn.toString = () => tplFn()
  tplFn.valueOf = () => tplFn()

  return tplFn
}

// Dogfooding
const warnMsg = chalkStencil`Warning: The color or style ${'_::cyan.underline'} does not exist
::yellow`

module.exports = chalkStencil
