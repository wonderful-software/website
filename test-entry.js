/* global mocha, TestBed */
const mochaElement = document.createElement('div')
mochaElement.id = 'mocha'
document.body.appendChild(mochaElement)
require('!!script!mocha/mocha.js')
require('!!style!css!mocha/mocha.css')
mocha.setup({ ui: 'bdd' })

TestBed.setup({
  run () {
    var runner = mocha.run()
    runner.on('fail', function (test) {
      setTimeout(() => { throw test.err })
    })
  }
})

TestBed.receiveContext(require('./test-context'))
module.hot.accept('./test-context', function () {
  TestBed.receiveContext(require('./test-context'))
})
