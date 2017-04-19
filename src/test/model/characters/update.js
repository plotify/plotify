import { describe, it } from "mocha";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { updateCharacter } from "../../../main/model/characters/update";
import ChangeType from "../../../main/shared/characters/change-type";

chai.use(chaiAsPromised);

describe("characters / update", () => {

  describe("#updateCharacter", () => {

    const id = "abc";
    const type = ChangeType.CHARACTER;
    const typeId = "123";
    const changes = {};

    it("should be rejected if no character id was passed", () => {
      expect(updateCharacter(undefined, type, typeId, changes)).to.eventually.be
        .rejectedWith("No character id was passed as a string: undefined")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no character id was passed as a string", () => {
      expect(updateCharacter(123, type, typeId, changes)).to.eventually.be
        .rejectedWith("No character id was passed as a string: 123")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no type was passed", () => {
      expect(updateCharacter(id, undefined, typeId, changes)).to.eventually.be
        .rejectedWith("No valid type was passed: undefined").and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no valid type was passed", () => {
      expect(updateCharacter(id, 999, typeId, changes)).to.eventually.be
        .rejectedWith("No valid type was passed: 999").and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no type id was passend", () => {
      expect(updateCharacter(id, type, undefined, changes)).to.eventually.be
        .rejectedWith("No type id was passed as a string: undefined")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no type id was passend as string", () => {
      expect(updateCharacter(id, type, 123, changes)).to.eventually.be
        .rejectedWith("No type id was passed as a string: 123")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no changes were passend", () => {
      expect(updateCharacter(id, type, typeId, undefined)).to.eventually.be
        .rejectedWith("No changes were passed as an object: undefined")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no changes were passend as an object", () => {
      expect(updateCharacter(id, type, typeId, "abc")).to.eventually.be
        .rejectedWith("No changes were passed as an object: abc")
        .and.be.an.instanceOf(TypeError);
    });

  });

});
