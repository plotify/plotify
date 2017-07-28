import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as constants from "./constants";
import * as selectors from "./selectors";
import reducer from "./reducer";

import registerChains from "./chains";
registerChains();

export default { actions, actionTypes, constants, selectors, reducer };
