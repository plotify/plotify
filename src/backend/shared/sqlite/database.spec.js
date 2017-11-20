import { beforeEach, describe, it } from 'mocha'
import chai, { expect } from 'chai'
import { match, stub } from 'sinon'

import Database from './database'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)
chai.use(chaiAsPromised)

const exampleStatement = 'SELECT foo FROM bar;'

let database
let connection

describe('Database', () => {
  beforeEach(() => {
    connection = {
      close: stub().callsArg(0),
      exec: stub().callsArg(1)
    }
    database = new Database(connection)
  })

  describe('#constructor', () => {
    it('constructs object when called with object', () => {
      expect(new Database({})).to.be.an('object')
    })

    it('throws TypeError when called without argument', () => {
      expect(() => new Database()).to.throw(TypeError)
    })

    it('throws TypeError when called without an object', () => {
      expect(() => new Database('foobar')).to.throw(TypeError)
    })

    it('throws TypeError when called with null', () => {
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
      const error = new Error()
      connection.close = stub().callsArgWith(0, error)
      return expect(database.close()).to.be.rejectedWith(error)
    })
  })

  describe('#exec', () => {
    it('returns a promise when called with SQL statement', () => {
      expect(database.exec(exampleStatement)).to.be.a('promise')
    })

    it('throws TypeError when called without argument', () => {
      expect(() => database.exec()).to.throw(TypeError)
    })

    it('throws TypeError when called without an SQL statement', () => {
      expect(() => database.exec(123)).to.throw(TypeError)
    })

    it('throws TypeError when called with null', () => {
      expect(() => database.exec(null)).to.throw(TypeError)
    })

    it('tries to execute the SQL statement', async () => {
      await database.exec(exampleStatement)
      expect(connection.exec).to.have.been.calledWith(exampleStatement, match.func)
    })

    it('returns without error when the SQL statement was executed successfully', () => {
      return expect(database.exec(exampleStatement)).to.be.fulfilled
    })

    it('throws error when SQL statement could not be executed', () => {
      const error = new Error()
      connection.exec = stub().callsArgWith(1, error)
      return expect(database.exec(exampleStatement)).to.be.rejectedWith(error)
    })
  })
})
