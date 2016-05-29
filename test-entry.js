/* global mocha, TestBed */
var TestBedMocha = require('test-bed/adapters/mocha')
TestBedMocha.setup({ ui: 'bdd' })

require('rx').config.Promise = Promise

TestBedMocha.run({
  context: require.context(
    './src',
    true,
    /\.web\.spec\.js$/
  )
})
