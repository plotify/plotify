import ChangeType from "../../shared/characters/change-type";

export function getTypeTable(type) {
  switch (type) {
    case ChangeType.CHARACTER:
      return "character";
    case ChangeType.ENTRY_GROUP:
      return "entry_group";
    case ChangeType.ENTRY:
      return "entry";
    default:
      throw new Error("Unknown type.");
  }
}

export function getTypeHistoryTable(type) {
  switch (type) {
    case ChangeType.CHARACTER:
      return "character_history";
    case ChangeType.ENTRY_GROUP:
      return "entry_group_history";
    case ChangeType.ENTRY:
      return "entry_history";
    default:
      throw new Error("Unknown type.");
  }
}

export const Queue = Object.freeze({
  PAST: 0,
  FUTURE: 1
});
