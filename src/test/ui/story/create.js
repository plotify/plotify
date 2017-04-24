import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";

import reducer from "../../../main/ui/rootReducer";
import * as s from "../../../main/ui/story/selectors";

describe("ui / story / create", () => {

  describe("initial state", () => {

    const initialState = reducer(undefined, {});

    it("no story should be creating", () => {
      expect(s.isStoryCreating(initialState)).to.be.false;
    });

    it("no story creation should be failed", () => {
      expect(s.isStoryCreationFailed(initialState)).to.be.false;
    });

    it("no story creation error should be present", () => {
      expect(s.getStoryCreationError(initialState)).to.be.null;
    });

  });

});
