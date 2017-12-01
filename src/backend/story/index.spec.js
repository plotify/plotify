import { Story, createStory } from './'

test('exports Story class', () => {
  expect(Story).toBeInstanceOf(Function)
})

test('exports createStory function', () => {
  expect(createStory).toBeInstanceOf(Function)
})
