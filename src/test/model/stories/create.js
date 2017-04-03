import { describe, it, beforeEach } from "mocha";
import chai, { expect } from "chai";
import { stub, spy, mock } from "sinon";
import sinonChai from "sinon-chai";

import { getNewFilePath } from "../../../main/model/stories/create";
import app from "../../../main/shared/commons/app";

import tmp from "tmp";
import path from "path";
import fs from "fs";

chai.use(sinonChai);

describe("stories/create", () => {

  describe("#getNewFilePath", () => {

    let directory;

    beforeEach(() => {
      directory = tmp.dirSync().name;
      app.getPath = (name) => {
        if (name === "documents") {
          return directory;
        } else {
          throw new Error("Unexpected name: " + name);
        }
      };
    });

    it("should use users documents directory", () => {
      const filePath = getNewFilePath();
      expect(path.dirname(filePath)).to.equal(directory);
    });

    it("should create new file in users documents directory", () => {
      const filePath = getNewFilePath();
      expect(filePath).to.equal(path.join(directory, "new-story-1.story"));
    });

    it("should create new file with incremented name if file already exists", () => {
      fs.closeSync(fs.openSync(path.join(directory, "new-story-1.story"), "w"));
      const filePath = getNewFilePath(app);
      expect(filePath).to.equal(path.join(directory, "new-story-2.story"));
    });

  });

});
