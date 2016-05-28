/* global mocha, TestBed */
const mochaElement = document.createElement('div')
mochaElement.id = 'mocha'
document.body.appendChild(mochaElement)
require('!!script!mocha/mocha.js')
require('!!style!css!mocha/mocha.css')
mocha.setup({ ui: 'bdd' })

require('rx').config.Promise = Promise

TestBed.run({
  context: require.context(
    './src',
    true,
    /\.web\.spec\.js$/
  ),
  runTests: function () {
    return new Promise(function (resolve) {
      var runner = mocha.run(resolve)
      runner.on('fail', function (test) {
        setTimeout(function () { throw test.err })
      })
    })
  }
})
