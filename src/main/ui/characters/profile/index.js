import * as actions from "./actions";
import * as constants from "./constants";
import * as selectors from "./selectors";
import reducer from "./reducer";

import registerChains from "./chains";
registerChains();

export default { actions, constants, selectors, reducer };
