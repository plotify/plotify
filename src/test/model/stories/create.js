import { describe, it, beforeEach } from "mocha";
import chai, { expect } from "chai";
import { spy, match } from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

import tmp from "tmp";
import path from "path";
import fs from "fs";

import { createNewStory, registerCreateStoryIpcChannel } from "../../../main/model/stories/create";
import { CREATE_STORY } from "../../../main/shared/stories/ipc-channels";
import app from "../../../main/shared/commons/app";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("stories / create", () => {

  describe("#createNewStory", () => {

    let directory;
    beforeEach(() => { directory = prepareTestDirectory(); });

    it("should create new file in users documents directory", () => {
      const expectedFilePath = path.join(directory, "new-story-1.story");
      expect(createNewStory()).to.eventually.equal(expectedFilePath);
    });

    it("should create new file with incremented name if file already exists", () => {
      fs.closeSync(fs.openSync(path.join(directory, "new-story-1.story"), "w"));
      const expectedFilePath = path.join(directory, "new-story-2.story");
      expect(createNewStory()).to.eventually.equal(expectedFilePath);
    });

  });

  describe("#registerCreateStoryIpcChannel", () => {

    it("should register channel", () => {
      const ipcMain = { on: () => {} };
      const on = spy(ipcMain, "on");
      registerCreateStoryIpcChannel(ipcMain);
      expect(on).to.have.been.calledWith(CREATE_STORY, match.func);
    });

  });

});

function prepareTestDirectory() {

  const directory = tmp.dirSync().name;

  app.getPath = (name) => {
    if (name === "documents") {
      return directory;
    } else {
      throw new Error("Unexpected name: " + name);
    }
  };

  return directory;

}
