import { describe, it } from "mocha";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { getCharacterProfile } from "../../../main/model/characters/get-profile";

chai.use(chaiAsPromised);

describe("characters / get-profile", () => {

  describe("#getCharacterProfile", () => {

    it("should be rejected if no character id was passed", () => {
      return expect(getCharacterProfile(undefined)).to.eventually.be
        .rejectedWith("No character id was passed as a string: undefined")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no character id was passed as a string", () => {
      return expect(getCharacterProfile(123)).to.eventually.be
        .rejectedWith("No character id was passed as a string: 123")
        .and.be.an.instanceOf(TypeError);
    });

  });

});
