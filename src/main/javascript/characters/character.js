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

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  setName(name) {

    if (typeof name !== "string") {
      throw new TypeError();
    }

    this._name = name;

  }

  isDeleted() {
    return this._deleted;
  }

  setDeleted(deleted) {

    if (typeof deleted !== "boolean") {
      throw new TypeError();
    }

    this._deleted = deleted;

  }

}
