export const CHARACTER_TYPE = Object.freeze({
  id: 0,
  sequenceTable: Object.freeze({
    name: 'character_changes_sequence',
    entityIdColumn: 'character_id'
  }),
  entityTable: 'character',
  historyTable: 'character_history'
})

export const ENTRY_GROUP_TYPE = Object.freeze({
  id: 1,
  sequenceTable: Object.freeze({
    name: 'character_changes_sequence',
    entityIdColumn: 'character_id'
  }),
  entityTable: 'entry_group',
  historyTable: 'entry_group_history'
})

export const ENTRY_TYPE = Object.freeze({
  id: 2,
  sequenceTable: Object.freeze({
    name: 'character_changes_sequence',
    entityIdColumn: 'character_id'
  }),
  entityTable: 'entry',
  historyTable: 'entry_history'
})

export const TYPES = Object.freeze([
  CHARACTER_TYPE, ENTRY_GROUP_TYPE, ENTRY_TYPE
])
