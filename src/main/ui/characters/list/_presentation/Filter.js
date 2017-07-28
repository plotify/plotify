import React, { PureComponent } from "react";
import PropTypes from "prop-types";

// TODO split into two components: expandable-input and custom plotify filter
export default class Filter extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    const id = this.props.id;
    const fieldId = `search-input-${id}`;
    const labelId = `search-icon-${id}`;
    return (
      <div className="plotify-filter">
        <div className="mdl-layout__header-row">
          <h6>Filter</h6>
          <div className="mdl-layout-spacer" />
          <div className="mdl-navigation">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
              <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor={ fieldId }>
                <i className="material-icons">search</i>
              </label>
              <div className="mdl-textfield__expandable-holder">
                <input
                  className="mdl-textfield__input"
                  type="text" id={ fieldId }
                  onChange={ this.handleChange }
                />
                <label className="mdl-textfield__label" htmlFor={ labelId }>Expandable Input</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  id:       PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
