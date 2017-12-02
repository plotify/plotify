import UnsupportedStoryFileVersionError from './unsupported-story-file-version-error'

test('extends Error', () => {
  expect(new UnsupportedStoryFileVersionError('Hello world')).toBeInstanceOf(Error)
})
