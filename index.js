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

const chalkTag = function chalkTag(strings, ...keys) {
  let i = 0
  let resStr = ''
  for (const s of strings) {
    resStr = `${resStr}${s}${colorize(keys[i++] || '')}`
  }
  return resStr
}

const chalkTemplate = function chalkTemplate(strings, ...keys) {
  return (props) => {
    let i = 0
    let resStr = ''
    for (const s of strings) {
      const key = keys[i++]
      if (!key) {
        resStr = `${resStr}${s}`
      } else {
        const [ prop, style ] = key.split('::')
        const val = (prop && props[prop]) ||
            ((prop === '_' && typeof props !== 'object') ? props : `<missing property '${prop}'>`)
        if (style) {
          resStr = `${resStr}${s}${colorize(`${val}::${style}`)}`
        } else {
          resStr = `${resStr}${s}${val}`
        }
      }
    }
    return colorRE.exec(resStr) ? colorize(resStr) : resStr
  }
}

// Dogfooding
const warnMsg = chalkTemplate`Warning: The color or style ${'_::cyan.underline'} does not exist
::yellow`

module.exports = chalkTemplate
module.exports.tag = chalkTag
module.exports._ = chalk
