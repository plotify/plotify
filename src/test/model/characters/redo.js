import { describe, it } from "mocha";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { canRedoCharacterChange, redoCharacterChange } from "../../../main/model/characters/redo";

chai.use(chaiAsPromised);

describe("characters / redo", () => {

  describe("#canRedoCharacterChange", () => {

    it("should be rejected if no character id was passed", () => {
      return expect(canRedoCharacterChange(undefined)).to.eventually.be
        .rejectedWith("No character id was passed as a string: undefined")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no character id was passed as a string", () => {
      return expect(canRedoCharacterChange(123)).to.eventually.be
        .rejectedWith("No character id was passed as a string: 123")
        .and.be.an.instanceOf(TypeError);
    });

  });

  describe("#redoCharacterChange", () => {

    it("should be rejected if no character id was passed", () => {
      return expect(redoCharacterChange(undefined)).to.eventually.be
        .rejectedWith("No character id was passed as a string: undefined")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no character id was passed as a string", () => {
      return expect(redoCharacterChange(123)).to.eventually.be
        .rejectedWith("No character id was passed as a string: 123")
        .and.be.an.instanceOf(TypeError);
    });

  });

});
