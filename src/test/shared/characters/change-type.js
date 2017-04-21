import { describe, it } from "mocha";
import chai, { expect } from "chai";

import { addChange } from "../../../main/model/characters/add-change";
import ChangeType, { isValidChangeType } from "../../../main/shared/characters/change-type";

describe("characters / change-type", () => {

  describe("#isValidChangeType", () => {

    it("should return true if the passed type is valid", () => {
      expect(isValidChangeType(ChangeType.CHARACTER)).to.be.true;
      expect(isValidChangeType(ChangeType.ENTRY_GROUP)).to.be.true;
      expect(isValidChangeType(ChangeType.ENTRY)).to.be.true;
    });

    it("should return false if no type was passed", () => {
      expect(isValidChangeType()).to.be.false;
    });

    it("should return false if an unknown type was passed", () => {
      expect(isValidChangeType(999)).to.be.false;
    });

  });

});
