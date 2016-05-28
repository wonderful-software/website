/* global describe, it */
import runCode from './runCode'
import assert from 'assert'
import decode from '../serializr/decode'

describe('runCode', () => {
  it('runs my code', async () => {
    const options = {
      code: 'console.log("meow")'
    }
    const result = await runCode(options).timeout(1000).toArray().toPromise()
    const log = getEventWithTypeFromResult('console.log', result)
    assert.deepEqual(decode(log.args), [ 'meow' ])
  })

  it('reports error', async () => {
    const options = {
      code: `function a () { b() }
             function b () { c() }
             function c () { throw new Error('meow') }
             a()`
    }
    const result = await runCode(options).timeout(1000).toArray().toPromise()
    const error = getEventWithTypeFromResult('errored', result)
    assert.equal(error.message, 'meow')
    assert.equal(error.stack.length, 4)
  })
})

function getEventWithTypeFromResult (eventType, result) {
  const eventTypes = result.map(event => event.type)
  const event = result.filter(event => event.type === eventType)[0]
  assert(event, 'expected "' + eventType + '" event among events: ' + eventTypes)
  return event
}
