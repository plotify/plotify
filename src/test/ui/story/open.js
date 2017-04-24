import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";

import reducer from "../../../main/ui/rootReducer";
import * as s from "../../../main/ui/story/selectors";

describe("ui / story / open", () => {

  describe("initial state", () => {

    const initialState = reducer(undefined, {});

    it("no story should be open", () => {
      expect(s.isStoryOpen(initialState)).to.be.false;
    });

    it("no story should be loading", () => {
      expect(s.isStoryLoading(initialState)).to.be.false;
    });

    it("no story loading should be failed", () => {
      expect(s.isStoryLoadingFailed(initialState)).to.be.false;
    });

    it("no story loading error should be present", () => {
      expect(s.getStoryLoadingError(initialState)).to.be.null;
    });

    it("no story file should be set", () => {
      expect(s.getOpenStoryFile(initialState)).to.be.null;
    });

  });

});
