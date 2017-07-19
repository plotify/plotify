import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class Snackbar extends PureComponent {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      const data = {
        message:       nextProps.message,
        timeout:       nextProps.autoHideDuration,
        actionHandler: nextProps.action ? nextProps.action : (undefined),
        actionText:    nextProps.actionLabel ? nextProps.actionLabel : (undefined),
      };
      this.show(data);
    }
  }

  show(data) {
    this.node.MaterialSnackbar.showSnackbar(data);
    setTimeout(() => {
      this.props.onRequestClose();
    }, data.timeout)
  }

  get node() {
    return ReactDOM.findDOMNode(this);
  }

  render() {
    return (
      <div className="mdl-js-snackbar mdl-snackbar">
        <div className="mdl-snackbar__text" />
        <button className="mdl-snackbar__action" type="button" />
      </div>
    );
  }
}

Snackbar.propTypes = {
  message:          PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number.isRequired,
  action:           PropTypes.func,
  actionLabel:      PropTypes.string,
  onRequestClose:   PropTypes.func,
};

Snackbar.defaultProps = {
  autoHideDuration: 2000,
};
