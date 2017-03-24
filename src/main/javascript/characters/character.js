import UUID from "../commons/uuid";

export default class Character {

  constructor(id = UUID.random()) {

    if (!(id instanceof UUID)) {
      throw new TypeError();
    }

    this._id = id;
    this._name = "";
    this._deleted = false;

  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(name) {

    if (typeof name !== "string") {
      throw new TypeError();
    }

    this._name = name;

  }

  get deleted() {
    return this._deleted;
  }

  set deleted(deleted) {

    if (typeof deleted !== "boolean") {
      throw new TypeError();
    }

    this._deleted = deleted;

  }

}
