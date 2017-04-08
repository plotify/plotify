import { describe, it } from "mocha";
import chai, { expect } from "chai";
import { spy, match } from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

import {
  findCharacters,
  registerFindCharactersIpcChannel
} from "../../../main/model/characters/find";
import { FIND_CHARACTERS } from "../../../main/shared/characters/ipc-channels";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("characters / find", () => {

  describe("#findCharacters", () => {

    it("should return not deleted characters", () => {
      return expect(findCharacters(false)).to.eventually.have.property("length", 2);
    });

    it("should return not deleted filtered characters", () => {
      return expect(findCharacters(false, "max")).to.eventually.have.property("length", 1);
    });

    it("should return deleted characters", () => {
      return expect(findCharacters(true)).to.eventually.have.property("length", 4);
    });

  });

  describe("registerFindCharactersIpcChannel", () => {

    it("should register channel", () => {
      const ipcMain = { on: () => {} };
      const on = spy(ipcMain, "on");
      registerFindCharactersIpcChannel(ipcMain);
      expect(on).to.have.been.calledWith(FIND_CHARACTERS, match.func);
    });

  });


});
