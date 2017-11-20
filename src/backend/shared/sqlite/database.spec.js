import { beforeEach, describe, it } from 'mocha'
import chai, { expect } from 'chai'
import { match, stub } from 'sinon'

import Database from './database'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)
chai.use(chaiAsPromised)

let database
let connection

describe('Database', () => {
  beforeEach(() => {
    connection = {
      close: stub().callsArg(0)
    }
    database = new Database(connection)
  })

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

  describe('#close', () => {
    it('returns a promise', () => {
      expect(database.close()).to.be.a('promise')
    })

    it('tries to close the connection', async () => {
      await database.close()
      expect(connection.close).to.have.been.calledWith(match.func)
    })

    describe('if the connection was closed successfully', () => {
      it('returns without error', () => {
        return expect(database.close()).to.be.fulfilled
      })
    })

    describe('if the connection could not be closed', () => {
      it('throws error', () => {
        connection.close = stub().callsArgWith(0, new Error())
        return expect(database.close()).to.be.rejected
      })
    })
  })
})
