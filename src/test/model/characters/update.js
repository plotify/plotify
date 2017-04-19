import { describe, it } from "mocha";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { updateCharacter } from "../../../main/model/characters/update";

chai.use(chaiAsPromised);

describe("characters / update", () => {

  describe("#updateCharacter", () => {

    it("should be rejected if no character id was passed", () => {
      expect(updateCharacter()).to.eventually.be
        .rejectedWith("No character id was passed as a string.").and.be.an.instanceOf(TypeError);
    });

  });

});
