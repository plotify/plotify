import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as a from "../actions";
import Filter from "../_presentation/Filter";

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (filter) => dispatch(a.setCharactersFilter(filter)),
  }
};

const CharacterFilter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);

export default CharacterFilter;

CharacterFilter.propTypes = {
  id: PropTypes.string.isRequired,
};
