import { CHARACTER_TYPE, ENTRY_GROUP_TYPE, ENTRY_TYPE } from './types'

import { validateType } from '../shared/entity-changes'

test('character type is valid type', () => {
  validateType(CHARACTER_TYPE)
})

test('entry group type is valid type', () => {
  validateType(ENTRY_GROUP_TYPE)
})

test('entry type is valid type', () => {
  validateType(ENTRY_TYPE)
})
