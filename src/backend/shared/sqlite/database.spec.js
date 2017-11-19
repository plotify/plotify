import { describe, it } from 'mocha'

import Database from './database'
import { expect } from 'chai'

describe('Database', () => {
  describe('#constructor', () => {
    describe('with object', () => {
      it('should construct object', () => {
        expect(new Database({})).to.be.an('object')
      })
    })

    describe('without argument', () => {
      it('should throw TypeError', () => {
        expect(() => new Database()).to.throw(TypeError)
      })
    })

    describe('with not an object', () => {
      it('should throw TypeError', () => {
        expect(() => new Database('foobar')).to.throw(TypeError)
      })
    })

    describe('with null', () => {
      it('should throw TypeError', () => {
        expect(() => new Database(null)).to.throw(TypeError)
      })
    })
  })
})
