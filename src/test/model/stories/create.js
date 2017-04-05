import { describe, it, beforeEach } from "mocha";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import tmp from "tmp";
import path from "path";
import fs from "fs";

import { createNewStory } from "../../../main/model/stories/create";
import app from "../../../main/shared/commons/app";

chai.use(chaiAsPromised);

describe("stories/create", () => {

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
