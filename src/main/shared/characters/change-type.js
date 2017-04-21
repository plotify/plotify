const types = Object.freeze({
  CHARACTER: 0,
  ENTRY_GROUP: 1,
  ENTRY: 2
});
export default types;

export function isValidChangeType(type) {
  return type == types.CHARACTER ||
         type == types.ENTRY_GROUP ||
         type == types.ENTRY;
}
