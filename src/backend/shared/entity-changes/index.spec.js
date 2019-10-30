import { addChange, canRedo, canUndo, redo, undo, validateType, validateTypeGroup } from './'

test('exports addChange function', () => {
  expect(addChange).toBeInstanceOf(Function)
})

test('exports validateType function', () => {
  expect(validateType).toBeInstanceOf(Function)
})

test('exports validateTypeGroup function', () => {
  expect(validateTypeGroup).toBeInstanceOf(Function)
})

test('exports canUndo function', () => {
  expect(canUndo).toBeInstanceOf(Function)
})

test('exports undo function', () => {
  expect(undo).toBeInstanceOf(Function)
})

test('exports canRedo function', () => {
  expect(canRedo).toBeInstanceOf(Function)
})

test('exports redo function', () => {
  expect(redo).toBeInstanceOf(Function)
})
