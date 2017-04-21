import { describe, it } from "mocha";
import chai, { expect } from "chai";
import { spy, match } from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

import {
  registerFindCharactersIpcChannel,
  findCharacters
} from "../../../main/model/characters/find";
import { FIND_CHARACTERS } from "../../../main/shared/characters/ipc-channels";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("characters / find", () => {

  describe("#registerFindCharactersIpcChannel", () => {

    it("should register channel", () => {
      const ipcMain = { on: () => {} };
      const on = spy(ipcMain, "on");
      registerFindCharactersIpcChannel(ipcMain);
      expect(on).to.have.been.calledWith(FIND_CHARACTERS, match.func);
    });

  });

  describe("#findCharacters", () => {

    it("should be rejected if no deleted flag was passed", () => {
      return expect(findCharacters(undefined, undefined)).to.eventually.be
        .rejectedWith("No deleted flag was passed as a boolean: undefined")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if no deleted flag was passed as a boolean", () => {
      return expect(findCharacters(1, undefined)).to.eventually.be
        .rejectedWith("No deleted flag was passed as a boolean: 1")
        .and.be.an.instanceOf(TypeError);
    });

    it("should be rejected if a filter was passed which is no string", () => {
      return expect(findCharacters(false, 123)).to.eventually.be
        .rejectedWith("Filter is not a string: 123")
        .and.be.an.instanceOf(TypeError);
    });

  });


});
