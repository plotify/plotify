import { InvalidStoryFileError, Story, UnsupportedStoryFileVersionError, createStory, openStory } from './'

test('exports Story class', () => {
  expect(Story).toBeInstanceOf(Function)
})

test('exports createStory function', () => {
  expect(createStory).toBeInstanceOf(Function)
})

test('exports openStory function', () => {
  expect(openStory).toBeInstanceOf(Function)
})

test('exports InvalidStoryFileError class', () => {
  expect(InvalidStoryFileError).toBeInstanceOf(Function)
})

test('exports UnsupportedStoryFileVersionError class', () => {
  expect(UnsupportedStoryFileVersionError).toBeInstanceOf(Function)
})
