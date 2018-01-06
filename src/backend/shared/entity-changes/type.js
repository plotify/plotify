export const validateType = (type) => {
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
