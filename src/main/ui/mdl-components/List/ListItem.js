import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = {
      hover: false,
    };
  }

  getStyle() {
    return {
      cursor: "pointer",
    };
  }

  get background() {
    const hovered = this.state.hover;
    const selected = this.props.selected;
    const result = [];
    if (selected) {
      result.push([
        "mdl-color--secondary",
      ]);
    }

    if (hovered && !selected) {
      result.push([
        "mdl-color--grey-200",
      ]);
    }
    return result;
  }

  get text() {
    if (this.props.selected) {
        return "mdl-color-text--white";
    }
  }

  handleMouseOver() {
    this.setState({ hover: true });
  }

  handleMouseOut() {
    this.setState({ hover: false });
  }

  render() {
    const showLeftIcon = typeof this.props.leftIcon !== "undefined";
    return (
      <div
        className={ classNames("mdl-list__item", this.background, this.text) }
        onClick={ this.props.handleSelect }
        style={ this.getStyle() }
        onMouseOver={ this.handleMouseOver }
        onMouseOut={ this.handleMouseOut }
      >
        <span className="mdl-list__item-primary-content">
          {
            showLeftIcon &&
            <span className={ classNames("material-icons", "mdl-list__item-icon", this.text) }>
              { this.props.leftIcon }
            </span>
          }
          { this.props.caption }
        </span>
      </div>
    );
  }
}

ListItem.propTypes = {
  caption:      PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
  selected:     PropTypes.bool.isRequired,
  leftIcon:     PropTypes.string,
};

ListItem.defaultProps = {
  selected: false,
};
