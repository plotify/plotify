import { describe, it, beforeEach } from "mocha";
import chai, { expect } from "chai";
import { stub, spy, match } from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

import {
  closeStory,
  registerCloseStoryIpcChannel
} from "../../../main/model/stories/close";

import {
  NoStoryOpenedError,
  CouldNotCloseStoryError
} from "../../../main/shared/stories/errors";

import { getConnection, setConnection } from "../../../main/model/stories/connection";
import { CLOSE_STORY } from "../../../main/shared/stories/ipc-channels";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("stories / close", () => {

  describe("#closeStory", () => {

    it("should close the current connection", () => {

      const connection = { close: stub().callsArg(0) };
      setConnection(connection);

      return closeStory().then(() => {
        expect(connection.close).to.has.been.calledOnce;
        expect(getConnection()).to.be.null;
      });

    });

    it("should be rejected if no connection is open", () => {
      setConnection(null);
      return expect(closeStory()).to.eventually.be.rejected.and.be.an.instanceof(
        NoStoryOpenedError);
    });

    it("should be rejected if connection could not be closed", () => {
      setConnection({ close: stub().callsArgWith(0, { message: "Lorem ipsum" }) });
      return expect(closeStory()).to.eventually.be.rejectedWith("Lorem ipsum")
        .and.be.an.instanceOf(CouldNotCloseStoryError);
    });

    it("should not reset connection if connection could not be closed", () => {
      setConnection({ close: stub().callsArgWith(0, { message: "Lorem ipsum" }) });
      return closeStory().catch(() => {
        expect(getConnection()).to.not.be.null;
      });
    });

  });

  describe("#registerCloseStoryIpcChannel", () => {

    it("should register channel", () => {
      const ipcMain = { on: () => {} };
      const on = spy(ipcMain, "on");
      registerCloseStoryIpcChannel(ipcMain);
      expect(on).to.have.been.calledWith(CLOSE_STORY, match.func);
    });

  });

});
