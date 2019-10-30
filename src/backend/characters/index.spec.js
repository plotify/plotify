import { canRedo, canUndo, createCharacter, findCharacters, getCharacters, getProfile, redo, undo, updateCharacter, updateEntry } from './'

test('exports getCharacters function', () => {
  expect(getCharacters).toBeInstanceOf(Function)
})

test('exports findCharacters function', () => {
  expect(findCharacters).toBeInstanceOf(Function)
})

test('exports createCharacter function', () => {
  expect(createCharacter).toBeInstanceOf(Function)
})

test('exports getProfile function', () => {
  expect(getProfile).toBeInstanceOf(Function)
})

test('exports updateCharacter function', () => {
  expect(updateCharacter).toBeInstanceOf(Function)
})

test('exports updateEntry function', () => {
  expect(updateEntry).toBeInstanceOf(Function)
})

test('exports undo function', () => {
  expect(undo).toBeInstanceOf(Function)
})

test('exports canUndo function', () => {
  expect(canUndo).toBeInstanceOf(Function)
})

test('exports redo function', () => {
  expect(redo).toBeInstanceOf(Function)
})

test('exports canRedo function', () => {
  expect(canRedo).toBeInstanceOf(Function)
})
