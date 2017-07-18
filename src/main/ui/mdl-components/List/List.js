import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import componentHandler from "../../resources/material";

export default class List extends PureComponent {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.state = {
      selected: 0,
    };
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  selectItem(id) {
    this.setState({
      selected: id,
    });
    this.props.onSelectCharacter(id);
  }

  render() {
    return (
      <div className="mdl-list">
        { this.props.children }
      </div>
    );
  }
}

List.propTypes = {
  children:      PropTypes.node,
};
