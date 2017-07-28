import { registerChain } from "../../chained-actions";
import story from "../../story";

import { selectCharacter } from "./actions";

export default function registerChains() {
  registerChain(story.actionTypes.CLOSE_STORY_SUCCESSFUL, selectCharacter);
}