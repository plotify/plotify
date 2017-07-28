import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export class Avatar extends PureComponent {
  render() {
    return (
      <div className={classNames("mdl-list__item-avatar", this.props.className)}
      style={{
        backgroundImage: this.props.src ? "url(" + this.props.src + ")" : ""
      }}>
        {
          !this.props.src &&
          this.props.children
        }
      </div>
    );
  }
}

Avatar.propTypes = {
  src: PropTypes.string,
};

Avatar.defaultProps = {};
