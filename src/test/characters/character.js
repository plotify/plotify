import {describe, it} from "mocha";
import {expect} from "chai";

import Character from "../../main/characters/character";
import UUID from "../../main/commons/uuid";

describe("Character", () => {

  describe("#constructor", () => {

    it("should construct character with given id", () => {
      const id = UUID.random();
      const character = new Character(id);
      expect(character.getId()).to.equals(id);
    });

    it("should construct character with random id if no id has been passed", () => {
      const character = new Character();
      expect(character.getId()).to.be.an.instanceof(UUID);
    });

    it("should construct character with empty name", () => {
      const character = new Character(UUID.random());
      expect(character.getName()).to.be.empty;
    });

    it("should construct not deleted character", () => {
      const character = new Character(UUID.random());
      expect(character.isDeleted()).to.be.false;
    });

    it("should throw TypeError if parameter is not an UUID", () => {
      expect(() => { new Character("123"); }).to.throw(TypeError);
    });

  });

  describe("#setName", () => {

    it("should set the name to the given String", () => {
        const character = new Character(UUID.random());
        character.setName("Max Mustermann");
        expect(character.getName()).to.equals("Max Mustermann");
    });

    it("should throw TypeError if parameter is not a String", () => {
      const character = new Character(UUID.random());
      expect(() => { character.setName(123); }).to.throw(TypeError);
    });

  });

  describe("#setDeleted", () => {

    it("should set the deleted status to the given value", () => {
      const character = new Character(UUID.random());
      character.setDeleted(true);
      expect(character.isDeleted()).to.be.true;
    });

    it("should throw TypeError if parameter is not a boolean", () => {
      const character = new Character(UUID.random());
      expect(() => { character.setDeleted(123); }).to.throw(TypeError);
    });

  });

});
