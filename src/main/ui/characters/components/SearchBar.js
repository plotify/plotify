import React, { Component } from "react";
import { Paper, TextField } from "material-ui";
import ActionSearch from "material-ui/svg-icons/action/search";
import { connect } from "react-redux";
import { setCharactersFilter } from "../list/actions";
import { isCharacterSelected } from "../list/selectors";

const mapStateToProps = (state) => {
  return {
    isCharacterSelected: isCharacterSelected(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFilter: (name) => dispatch(setCharactersFilter(name))
  };
};

const styles = {
  paper: {
    padding: 8,
  },
  searchIcon: {
    float: "left",
    height: 48,
    width: 48,
    padding: 12,
  },
  textField: {
    display: "inline-block",
  },
};

class SearchBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      value: value
    });
    if (value === undefined) {
      this.props.handleFilter(null);
    } else {
      this.props.handleFilter(value);
    }
  }

  render() {
    return (
      <Paper zDepth={2} style={styles.paper}>
        <ActionSearch style={styles.searchIcon}/>
        <TextField
          style={styles.textField}
          value={this.state.value}
          hintText="Suche"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          onChange={this.handleChange}
        />
      </Paper>
    );
  }
}

const SearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarComponent);

export default SearchBar;