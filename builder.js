'use strict'

const fs = require('fs')
const files = require('./build/prerenderer/prerenderer').output
const template = require('fs').readFileSync('./build/assets/index.html', 'utf8')
const mkdirp = require('mkdirp')
const path = require('path')

for (const file of Object.keys(files)) {
  const out = path.join('dist', file)
  mkdirp.sync(path.dirname(out))
  Promise.resolve(files[file]()).then(result => {
    const html = template.replace(/<!--#(\w+)-->/g, (a, x) => {
      return result[x] || a
    })
    fs.writeFileSync(out, html)
    console.log('Wriiten to ' + out)
  })
  .catch(e => {
    console.error('Cannot write to ' + out + ':')
    console.error(e.stack)
  })
}
