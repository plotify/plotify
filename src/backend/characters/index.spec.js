import { createCharacter, findCharacters, getProfile, updateEntry } from './'

test('exports findCharacters function', () => {
  expect(findCharacters).toBeInstanceOf(Function)
})

test('exports createCharacter function', () => {
  expect(createCharacter).toBeInstanceOf(Function)
})

test('exports getProfile function', () => {
  expect(getProfile).toBeInstanceOf(Function)
})

test('exports updateEntry function', () => {
  expect(updateEntry).toBeInstanceOf(Function)
})
