import { describe, it } from "mocha";
import { expect } from "chai";

import Character from "../../../main/javascript/characters/character";
import UUID from "../../../main/javascript/commons/uuid";

describe("Character", () => {

  describe("#constructor", () => {

    it("should construct character with given id", () => {
      const id = UUID.random();
      const character = new Character(id);
      expect(character.id).to.equals(id);
    });

    it("should construct character with random id if no id has been passed", () => {
      const character = new Character();
      expect(character.id).to.be.an.instanceof(UUID);
    });

    it("should construct character with empty name", () => {
      const character = new Character(UUID.random());
      expect(character.name).to.be.empty;
    });

    it("should construct not deleted character", () => {
      const character = new Character(UUID.random());
      expect(character.deleted).to.be.false;
    });

    it("should throw TypeError if parameter is not an UUID", () => {
      expect(() => { new Character("123"); }).to.throw(TypeError);
    });

  });

  describe("#name", () => {

    it("should set the name to the given String", () => {
        const character = new Character(UUID.random());
        character.name = "Max Mustermann";
        expect(character.name).to.equals("Max Mustermann");
    });

    it("should throw TypeError if parameter is not a String", () => {
      const character = new Character(UUID.random());
      expect(() => { character.name = 123; }).to.throw(TypeError);
    });

  });

  describe("#deleted", () => {

    it("should set the deleted status to the given value", () => {
      const character = new Character(UUID.random());
      character.deleted = true;
      expect(character.deleted).to.be.true;
    });

    it("should throw TypeError if parameter is not a boolean", () => {
      const character = new Character(UUID.random());
      expect(() => { character.deleted = 123; }).to.throw(TypeError);
    });

  });

});
