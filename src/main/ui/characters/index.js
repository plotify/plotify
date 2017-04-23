import * as actions from "./actions";
import * as constants from "./constants";
import reducer from "./reducer";

import registerChains from "./page";
registerChains();

export default { actions, constants, reducer };
