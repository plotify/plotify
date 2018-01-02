import { createCharacter, findCharacters } from './'

test('exports findCharacters function', () => {
  expect(findCharacters).toBeInstanceOf(Function)
})

test('exports createCharacter function', () => {
  expect(createCharacter).toBeInstanceOf(Function)
})
