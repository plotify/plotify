import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dialog } from "../../mdl-components/Dialog";
import { FlatButton } from "../../mdl-components/Buttons";

export default class LicenseDialog extends PureComponent {
  render() {
    let text = this.props.loading ? "Text wid geladen..." : this.props.text;

    return (
      <Dialog
        className="plotify-license-dialog"
        title="Lizenz"
        open={this.props.open}
        onRequestClose={this.props.onClose}
        actions={[
          <FlatButton
            label="Schließen"
            key="schließen"
            onTouchTap={this.props.onClose} />,
        ]}
        autoScrollBodyContent={!this.props.loading}>
        <pre>{text}</pre>
      </Dialog>
    );
  }
}

LicenseDialog.propTypes = {
  loading: PropTypes.bool,
  open:    PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  text:    PropTypes.string,
};

LicenseDialog.defaultProps = {
  loading: false,
  open:    false,
};
