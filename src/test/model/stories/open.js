import { describe, it, beforeEach } from "mocha";
import chai, { expect } from "chai";
import { spy, match } from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

import tmp from "tmp";
import path from "path";
import fs from "fs";

import sqlite3 from "sqlite3";

import {
  openStory,
  AnotherStoryAlreadyOpenedError,
  registerOpenStoryIpcChannel
} from "../../../main/model/stories/open";
import { getConnection, setConnection } from "../../../main/model/stories/connection";
import { OPEN_STORY } from "../../../main/shared/stories/ipc-channels";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("stories / open", () => {

  describe("#openStory", () => {

    let file;
    beforeEach(() => {
      file = prepareTestFile();
      setConnection(null);
    });

    it("should open the passed file", () => {
      return openStory(file).then(() => {
        expect(getConnection().filename).to.equal(file);
        expect(getConnection().open).to.be.true;
      });
    });

    it("should create a readable and writable connection", () => {
      return openStory(file).then(() => {
        expect(getConnection().mode).to.equal(sqlite3.OPEN_READWRITE);
      });
    });

    it("should be rejected if a connection is already open", () => {
      setConnection({});
      return expect(openStory("test.story")).to.eventually.be.rejected.and.be.an.instanceOf(
        AnotherStoryAlreadyOpenedError);
    });

    it("should be rejected if the file does not exist", () => {
      const notExistingFile = file + ".not-existing";
      return expect(openStory(notExistingFile)).to.eventually.be.rejectedWith(
        "SQLITE_CANTOPEN: unable to open database file");
    });

  });

  describe("#registerOpenStoryIpcChannel", () => {

    it("should register channel", () => {
      const ipcMain = { on: () => {} };
      const on = spy(ipcMain, "on");
      registerOpenStoryIpcChannel(ipcMain);
      expect(on).to.have.been.calledWith(OPEN_STORY, match.func);
    });

  });

});

function prepareTestFile() {
  const directory = tmp.dirSync().name;
  const file = path.join(directory, "hello-world.story");
  fs.closeSync(fs.openSync(file, "w"));
  return file;
}
