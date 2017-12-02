import { InvalidStoryFileError, Story, createStory } from './'

test('exports Story class', () => {
  expect(Story).toBeInstanceOf(Function)
})

test('exports createStory function', () => {
  expect(createStory).toBeInstanceOf(Function)
})

test('exports InvalidStoryFileError class', () => {
  expect(InvalidStoryFileError).toBeInstanceOf(Function)
})
