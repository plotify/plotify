export const validateType = (type) => {
  if (!isObject(type)) {
    throw new TypeError()
  }
  if (!isPositiveNumber(type.id)) {
    throw new TypeError()
  }
  if (!isObject(type.sequenceTable)) {
    throw new TypeError()
  }
  if (!isNotEmptyString(type.sequenceTable.name)) {
    throw new TypeError()
  }
  if (!isNotEmptyString(type.sequenceTable.entityIdColumn)) {
    throw new TypeError()
  }
  if (!isNotEmptyString(type.entityTable)) {
    throw new TypeError()
  }
  if (!isNotEmptyString(type.historyTable)) {
    throw new TypeError()
  }
}

const isPositiveNumber = (number) => {
  return typeof number === 'number' && number >= 0
}

const isObject = (obj) => {
  return typeof obj === 'object'
}

const isNotEmptyString = (str) => {
  return typeof str === 'string' && str.length > 0
}

// Die Array-Indizes müssen mit den Typen-IDs übereinstimmen.
// Die Typen-IDs müssen aufsteigend vergeben werden, beginnend bei 0.
export const validateTypeGroup = (types) => {
  for (let i = 0; i < types.length; i++) {
    const type = types[i]
    validateType(type)

    if (type.id !== i) {
      throw new TypeError('Array index and type id must match: ' + i + ', ' + type.id)
    }
  }
}
