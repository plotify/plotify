import { describe, it } from "mocha";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import addChange from "../../../main/model/characters/add-change";
import ChangeType from "../../../main/shared/characters/change-type";

chai.use(chaiAsPromised);

describe("characters / addChange", () => {

  describe("#addChange", () => {

    const typeId = "abc";
    const characterId = "123";
    const type = ChangeType.CHARACTER;

    it("should be rejected if no type id was passed", () => {
      return expect(addChange(undefined)).to.eventually.be
        .rejectedWith("No type id was passed as a string: undefined")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no type id was passed as a string", () => {
      return expect(addChange(123)).to.eventually.be
        .rejectedWith("No type id was passed as a string: 123")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no character id was passed", () => {
      return expect(addChange(typeId, undefined)).to.eventually.be
        .rejectedWith("No character id was passed as a string: undefined")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no character id was passed as a string", () => {
      return expect(addChange(typeId, 123)).to.eventually.be
        .rejectedWith("No character id was passed as a string: 123")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no type was passed", () => {
      return expect(addChange(typeId, characterId, undefined)).to.eventually.be
        .rejectedWith("No valid type was passed: undefined").and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no valid type was passed", () => {
      return expect(addChange(typeId, characterId, 999)).to.eventually.be
        .rejectedWith("No valid type was passed: 999").and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no history id was passed", () => {
      return expect(addChange(typeId, characterId, type, undefined)).to.eventually.be
        .rejectedWith("No history id was passed as a string: undefined")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no history id was passed as a string", () => {
      return expect(addChange(typeId, characterId, type, 123)).to.eventually.be
        .rejectedWith("No history id was passed as a string: 123")
        .and.be.an.instanceOf(TypeError);
    });

  });

});
