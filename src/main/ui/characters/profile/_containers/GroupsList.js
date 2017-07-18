import { connect }from "react-redux";
import * as s from "../selectors";
import ProfileGroupsList from "../_presentation/ProfileGroupsList";

const mapStateToProps = (state) => {
  return {
    groups: s.getGroupsInOrder(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

const GroupsList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileGroupsList);

export default GroupsList;
