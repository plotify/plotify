import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import classNames from "classnames";

export class Dialog extends PureComponent {

  componentDidMount() {
    this.node.addEventListener("cancel", this.props.onRequestClose);
    if (this.props.open) {
      this.node.showModal();
    }
  }

  componentDidUpdate(prevProps) {
    const dialog = this.node;
    if (prevProps.open !== this.props.open && this.props.open) {
      dialog.showModal();
      dialog.classList.add("hide");
    } else {
      dialog.classList.remove("hide");
      dialog.close();
    }
  }

  componentWillUnmount() {
    this.node.removeEventListener("cancel", this.props.onRequestClose);
  }

  get node() {
    return ReactDOM.findDOMNode(this);
  }

  render() {
    //todo animations with ReactTransitionGroup possible?
    const { className, children, title, actions } = this.props;

    return (
      <dialog className={ classNames("mdl-dialog", className)}>
        { title &&
        <h4 className="mdl-dialog__title">
          { title }
        </h4>
        }
        <div className="mdl-dialog__content">
          { children }
        </div>
        <div className="mdl-dialog__actions">
          { actions.reverse() }
        </div>
      </dialog>
    );
  }
}

Dialog.propTypes = {
  title:          PropTypes.string,
  actions:        PropTypes.arrayOf(PropTypes.element),
  open:           PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
};

Dialog.defaultProps = {
  onRequestClose: () => e => e.preventDefault(),
};
