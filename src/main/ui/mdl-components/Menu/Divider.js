import React, { PureComponent } from "react";

const style = {
  height: 0,
  paddingTop: 2,
  marginBottom: 2,
};

export default class Divider extends PureComponent {
  render() {
    return (
      <li className="mdl-menu__item mdl-menu__item--full-bleed-divider" disabled style={ style } />
    );
  }
}
