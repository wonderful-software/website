'use strict'
/* global describe, it */
const htmlToTree = require('./htmlToTree')
const assert = require('assert')

describe('htmlToTree', () => {
  it('converts HTML into a tree', () => {
    const tree = htmlToTree('<div><p>Hello <a href="https://wonderful.software">world</a><strong><em class="emphasis" style="color:red">!</em></strong></p></div>')
    assert.deepEqual(tree, [ 'div', { },
      [ 'p', { },
        'Hello ',
        [ 'a', { href: 'https://wonderful.software' },
          'world'
        ],
        [ 'strong', { },
          [ 'em', { className: 'emphasis', style: { color: 'red' } }, '!' ]
        ]
      ]
    ])
  })

  it('converts input', () => {
    const tree = htmlToTree('<input type="text" value="a" />')
    assert.deepEqual(tree, [ 'input', { type: 'text', defaultValue: 'a' } ])
  })

  it('converts checkbox', () => {
    const tree = htmlToTree('<input type="checkbox" checked />')
    assert.deepEqual(tree, [ 'input', { type: 'checkbox', defaultChecked: true } ])
  })

  it('converts comments', () => {
    const tree = htmlToTree('<div><!-- wtf --></div>')
    assert.deepEqual(tree, [ 'div', { }, null ])
  })

  it('converts style', () => {
    const tree = htmlToTree('<div style="font-weight: 600"></div>')
    assert.deepEqual(tree, [ 'div', { style: { fontWeight: '600' } } ])
  })

  it('converts label', () => {
    const tree = htmlToTree('<label for="id">meow</label>')
    assert.deepEqual(tree, [ 'label', { htmlFor: 'id' }, 'meow' ])
  })
})
