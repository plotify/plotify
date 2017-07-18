# `./characters/_containers/`
Package that contains `redux container components` for `top level character components`.
These components connect `_presentation` components and `redux` store.

```javascript
// Example to create a CreateCharacter Container Component

import { connect } from "react-redux";
import creation from "../creation";
import CreateCharacterComponent from "../_presentation/CreateCharacterComponent";

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCharacter: () => dispatch(creation.actions.createCharacter())
  };
};

const CreateCharacter = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCharacterComponent);

export default CreateCharacter;

```
