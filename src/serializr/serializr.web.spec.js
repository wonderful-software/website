/* global describe, it */
import encode from './encode'
import decode from './decode'
import assert from 'assert'

describe('serializr', function () {
  it('gives back correct representation', function () {
    const original = [ { a: 1, b: 2 }, { c: 3, d: 4 } ]
    const encoded = encode(original)
    const decoded = decode(encoded)
    assert.deepEqual(original, decoded)
  })
  it('serializes function', function () {
    const original = [ x => x + 1 ]
    const encoded = encode(original)
    const decoded = decode(encoded)
    assert.equal(original.toString(), decoded.toString())
  })
  it('serializes regexp', function () {
    const original = /abc+/
    const encoded = encode(original)
    const decoded = decode(encoded)
    assert(decoded.test('wowabcccccwow'))
  })
})
