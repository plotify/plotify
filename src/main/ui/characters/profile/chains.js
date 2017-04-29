import { registerChain } from "../../chained-actions";
import list from "../list";

import { loadProfile } from "./actions";

export default function registerChains() {
  registerChain(list.actionTypes.SELECT_CHARACTER, loadProfile);
}
