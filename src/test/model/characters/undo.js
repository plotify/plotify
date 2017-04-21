import { describe, it } from "mocha";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { canUndoCharacterChange, undoCharacterChange } from "../../../main/model/characters/undo";

chai.use(chaiAsPromised);

describe("characters / undo", () => {

  describe("#canUndoCharacterChange", () => {

    it("should be rejected if no character id was passed", () => {
      return expect(canUndoCharacterChange(undefined)).to.eventually.be
        .rejectedWith("No character id was passed as a string: undefined")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no character id was passed as a string", () => {
      return expect(canUndoCharacterChange(123)).to.eventually.be
        .rejectedWith("No character id was passed as a string: 123")
        .and.be.an.instanceOf(TypeError);
    });

  });

  describe("#undoCharacterChange", () => {

    it("should be rejected if no character id was passed", () => {
      return expect(undoCharacterChange(undefined)).to.eventually.be
        .rejectedWith("No character id was passed as a string: undefined")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no character id was passed as a string", () => {
      return expect(undoCharacterChange(123)).to.eventually.be
        .rejectedWith("No character id was passed as a string: 123")
        .and.be.an.instanceOf(TypeError);
    });

  });

});
