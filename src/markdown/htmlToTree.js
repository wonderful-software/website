'use strict'

module.exports = function htmlToTree (html) {
  const $ = require('cheerio').load(html)
  const root = $(':root').get(0)
  return encode(root)
}

function encode (element) {
  switch (element.type) {
    case 'tag':
      return [ element.name, convertAttribs(element), ...element.children.map(encode) ]
    case 'text':
      return element.data
    case 'comment':
      return null
    default:
      console.log(element)
      throw new Error('Unknown element type: ' + element.type)
  }
}

// Adapted from:
// https://github.com/reactjs/react-magic/blob/master/src/htmltojsx.js

function convertAttribs (element) {
  const result = { }
  for (const name of Object.keys(element.attribs)) {
    convert(element.name, name, element.attribs[name])(result)
  }
  return result
}

function convert (tag, name, value) {
  switch (name) {
    case 'for': return set('htmlFor', value)
    case 'class': return set('className', value)
    case 'style': return set('style', convertStyle(value))
    case 'checked': return set(tag === 'input' ? 'defaultChecked' : 'checked', value)
    case 'value': return set(tag === 'input' ? 'defaultValue' : 'value', value)
    default: return set(name, value)
  }
}

function set (name, value) {
  return (object) => (object[name] = value || true)
}

function convertStyle (value) {
  const out = { }
  for (const declaration of value.split(';')) {
    const colonIndex = declaration.indexOf(':')
    const key = declaration.substr(0, colonIndex).trim()
    if (!key) continue
    const value = declaration.substr(colonIndex + 1).trim()
    const camelizedKey = (key
      .replace(/^\-ms/, 'ms')
      .replace(/-./, a => a.substr(1).toUpperCase())
    )
    out[camelizedKey] = value
  }
  return out
}
