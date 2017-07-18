import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export class CardActions extends PureComponent {
  render() {
    return (
      <div className={ classNames("mdl-card__actions", this.props.bordered ? "mdl-card--border" : "") }>
        { this.props.children }
      </div>
    );
  }
}

CardActions.propTypes = {
  bordered: PropTypes.bool,
};

CardActions.defaultProps = {
  bordered: false,
};
