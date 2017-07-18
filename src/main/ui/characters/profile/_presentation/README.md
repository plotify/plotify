# `./characters/_presentation/`
Package that contains `react presentational components` for `top level character components`
These components are simply `presentational` and do not contain any logical operations
besides how they affect themselves (e.g. ui transitions).

```js
// Example CreateCharacter Component
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class CreateCharacterComponent extends PureComponent {
  render() {
    return (
      <button onClick={ this.props.createCharacter }>
        { this.props.caption }
      </button>
    );
  }
}

CreateCharacterComponent.proptypes = {
  createCharacter:  PropTypes.func.isRequired,
  caption:          PropTypes.string.isRequired,
}

```
