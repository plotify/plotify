import { Database } from '../shared/sqlite'
import Story from './story'

const path = '/foo/bar.story'
let database
let story
beforeEach(() => {
  database = new Database({
    close: jest.fn(callback => callback())
  })
  story = new Story(path, database)
})

describe('#constructor', () => {
  test('constructs object when called with path and database', () => {
    expect(typeof new Story(path, database)).toBe('object')
  })

  test('throws TypeError when called without argument', () => {
    expect(() => new Story()).toThrow(TypeError)
  })

  test('throws TypeError when called with invalid path', () => {
    expect(() => new Story(123, database)).toThrow(TypeError)
  })

  test('throws TypeError when called without database', () => {
    expect(() => new Story(path)).toThrow(TypeError)
  })

  test('throws TypeError when called with invalid database', () => {
    expect(() => new Story(path, 'invalid database')).toThrow(TypeError)
  })

  test('throws Error when called with already closed database connection', async () => {
    await database.close()
    expect(() => new Story(path, database)).toThrow(Error)
  })
})

describe('#path', () => {
  test('returns path', () => {
    expect(story.path).toEqual(path)
  })
})

describe('#database', () => {
  test('returns database', () => {
    expect(story.database).toBe(database)
  })
})
