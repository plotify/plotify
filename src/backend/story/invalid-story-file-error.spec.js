import InvalidStoryFileError from './invalid-story-file-error'

test('extends Error', () => {
  expect(new InvalidStoryFileError('Hello world')).toBeInstanceOf(Error)
})
