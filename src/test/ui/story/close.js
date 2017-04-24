import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";

import reducer from "../../../main/ui/rootReducer";
import * as s from "../../../main/ui/story/selectors";

describe("ui / story / close", () => {

  describe("initial state", () => {

    const initialState = reducer(undefined, {});

    it("no story should be closing", () => {
      expect(s.isStoryClosing(initialState)).to.be.false;
    });

    it("no story closing should be failed", () => {
      expect(s.isStoryClosingFailed(initialState)).to.be.false;
    });

    it("no story closing error should be present", () => {
      expect(s.getStoryClosingError(initialState)).to.be.null;
    });

  });

});
