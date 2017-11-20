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
    it('should construct object when called with object', () => {
      expect(new Database({})).to.be.an('object')
    })

    it('should throw TypeError when called without argument', () => {
      expect(() => new Database()).to.throw(TypeError)
    })

    it('should throw TypeError when called without an object', () => {
      expect(() => new Database('foobar')).to.throw(TypeError)
    })

    it('should throw TypeError when called with null', () => {
      expect(() => new Database(null)).to.throw(TypeError)
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

    it('returns without error when the connection was closed successfully', () => {
      return expect(database.close()).to.be.fulfilled
    })

    it('throws error when the connection could not be closed', () => {
      connection.close = stub().callsArgWith(0, new Error())
      return expect(database.close()).to.be.rejected
    })
  })
})
