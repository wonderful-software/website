/* global describe, it */
import runCode from './runCode'
import assert from 'assert'

describe('runCode', () => {
  it('runs my code', async () => {
    const options = {
      code: 'console.log("meow")'
    }
    const result = await runCode(options).timeout(1000).toArray().toPromise()
    const log = getEventWithTypeFromResult('console.log', result)
    assert.deepEqual(log.args, [ 'meow' ])
  })

  it('reports error', async () => {
    const options = {
      code: `function a () { b() }
             function b () { c() }
             function c () { throw new Error('meow') }
             a()`
    }
    const result = await runCode(options).timeout(1000).toArray().toPromise()
    const error = getEventWithTypeFromResult('error', result)
    assert.equal(error.message, 'meow')
    assert.equal(error.stack.length, 4)
  })

  it('runs mocha suite', async () => {
    const options = {
      code: `
        var assert = require('assert')
        describe('addition', function () {
          it('works', function () {
            assert.equal(1 + 1, 2)
          })
        })
        describe('multiplication', function () {
          it('failing spec example', function () {
            assert.equal(2 * 3, 9)
          })
          it('has identity', function () {
            assert.equal(1 * 1, 1)
          })
        })
      `
    }
    const result = await runCode(options).timeout(1000).toArray().toPromise()
    ensureNoError(result)
    {
      const suites = getEventsWithTypeFromResult('suite', result)
      assert.equal(suites[0].title, '(root)')
      assert.equal(suites[1].title, 'addition')
      assert.equal(suites[2].title, 'multiplication')
    }
    {
      const suiteEnds = getEventsWithTypeFromResult('suite end', result)
      assert.equal(suiteEnds[0].title, 'addition')
      assert.equal(suiteEnds[1].title, 'multiplication')
      assert.equal(suiteEnds[2].title, '(root)')
    }
    {
      const passes = getEventsWithTypeFromResult('pass', result)
      assert.equal(passes[0].title, 'works')
      assert.equal(passes[1].title, 'has identity')
    }
    {
      const failures = getEventsWithTypeFromResult('fail', result)
      assert.equal(failures[0].title, 'failing spec example')
      assert.equal(failures[0].err.message, '6 == 9')
      console.log(failures[0].err.stack)
    }
  })
})

function getEventsWithTypeFromResult (eventType, result) {
  return result.filter(event => event.type === eventType)
}

function ensureNoError (result) {
  const error = getEventsWithTypeFromResult('error', result)[0]
  if (error) throw new Error('Script error: ' + error.message)
}

function getEventWithTypeFromResult (eventType, result) {
  const eventTypes = result.map(event => event.type)
  const event = getEventsWithTypeFromResult(eventType, result)[0]
  assert(event, 'expected "' + eventType + '" event among events: ' + eventTypes)
  return event
}
