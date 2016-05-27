/* global describe, it */
import runCode from './runCode'
import assert from 'assert'

describe('runCode', () => {
  it('runs my code', async () => {
    const options = {
      code: 'console.log("meow")'
    }
    const result = await runCode(options).timeout(1000).toArray().toPromise()
    assert(result.length > 0, 'results expected (got ' + result.length + ' results)')
    const log = result.filter(event => event.type === 'console.log')[0]
    assert(log, 'expected console.log event')
  })
})
