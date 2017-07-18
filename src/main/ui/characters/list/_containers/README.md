# `./characters/_containers/`
Package that contains `redux container components` for `top level character components`.
These components connect `_presentation` components and `redux` store.

```javascript
// Example to create a CharacterListItem Container Component

import { connect } from "react-redux";
import * as actions from "../actions";
import CreateCharacterComponent from "../_presentation/CreateCharacterComponent";

const mapStateToProps = (state) => {
  return {
    name:          state.name,
    deleted:       state.deleted,
    handleSelect:  state.selected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSelect: (id) => dispatch(actions.selectCharacter(id))
  };
};

const CreateCharacter = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCharacterComponent);

export default CreateCharacter;

```
