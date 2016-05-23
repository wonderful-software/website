'use strict'

const escapeHtml = require('escape-html')
const highlight = require('../code-highlighter/index')

const markdown = (
  require('markdown-it')({
    html: true,
    typographer: true,
    linkify: true
  })
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-deflist'))
  // .use(require('markdown-it-math'), MATH_OPTIONS)
)

function x (name, props, children = '') {
  return `<${name} props="${escapeHtml(JSON.stringify(props))}">${children}</${name}>`
}

markdown.renderer.rules.softbreak = () => '<span class="↩︎"> </span\n>'

markdown.renderer.rules.fence = (tokens, idx, options, env, slf) => {
  const token = tokens[idx]
  const code = token.content
  return (
    '<div class="❯ △">' + x('x-code-block', { code: code }, highlight(code, 'javascript')) + '</div>'
  )
}

function typographic (html) {
  const $ = require('cheerio').load(html)
  $(':root').filter('h1, h2, h3, h4, h5, h6, p, ul, ol, pre, blockquote, .footnotes, .❯').addClass('‼︎')
  $('h1').addClass('๑ △')
  $('h2').addClass('๒ △')
  $('h3').addClass('๓ △')
  $('h4').addClass('๔ △')
  $('h5').addClass('๕ △')
  $('h6').addClass('๖ △')
  $('p').addClass('¶ △')
  $('ul').addClass('• △ ▷')
  $('ol').addClass('№ △ ▷')
  $('li').addClass('· △')
  $('pre').addClass('🄰')
  $('code').addClass('𝚊')
  $('blockquote').addClass('❝ ☐ ▷')
  $('hr').addClass('— △')
  return $.html()
}

module.exports = body => {
  return '<div class="☐">' + typographic(markdown.render(body)) + '</div>'
}
