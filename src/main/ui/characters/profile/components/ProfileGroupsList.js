import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileGroup from "./ProfileGroup";
import * as s from "../selectors";

const mapStateToProps = (state) => {
  return {
    groups: s.getGroupsInOrder(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

class ProfileGroupsListComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
      {
        this.props.groups.map((group) => {
          return (
            <ProfileGroup
              key={group.id}
              title={group.title}
              entries={group.entries}
            />
          );
        })
      }
      </div>
    );
  }
}

const ProfileGroupsList = connect(
  mapStateToProps,
  mapDispatchToProps
) (ProfileGroupsListComponent);

export default ProfileGroupsList;
