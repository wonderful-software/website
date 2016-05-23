'use strict'

const fs = require('fs')
const files = require('./build/prerenderer/prerenderer').output
const template = inlineStuff(require('fs').readFileSync('./build/assets/index.html', 'utf8'))
const mkdirp = require('mkdirp')
const path = require('path')
const critical = require('critical')

function inlineStuff (html) {
  if (!html) return html
  return (html
    // .replace(/<link href="\/assets\/([^"]+\.css)" rel="stylesheet">/, (a, b) => {
    //   return '<style>' + fs.readFileSync('build/assets/' + b, 'utf8') + '</style>'
    // })
    .replace(/<script type="text\/javascript" src="\/assets\/([^"]+\.js)"><\/script>/, (a, b) => {
      return '<script>' + fs.readFileSync('build/assets/' + b, 'utf8') + '</script>'
    })
  )
}

for (const file of Object.keys(files)) {
  const out = path.join('dist', file)
  mkdirp.sync(path.dirname(out))
  Promise.resolve(files[file]()).then(result => {
    const html = template.replace(/<!--#(\w+)-->/g, (a, x) => {
      return result[x] || a
    })
    return critical.generate({
      base: path.join(__dirname, 'build'),
      html: html,
      inline: true,
      minify: true,
      width: 1280,
      height: 1280
    }).then(htmlWithCriticalCSS => {
      fs.writeFileSync(out, htmlWithCriticalCSS)
      console.log('Wriiten to ' + out)
    })
  })
  .catch(e => {
    console.error('Cannot write to ' + out + ':')
    console.error(e.stack)
  })
}
