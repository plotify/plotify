import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ProfileGroup from "./ProfileGroup";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class ProfileGroupsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="plotify-character-groups-list">
        {
          this.props.groups.map(({ id, title, entries }) => (
            <ReactCSSTransitionGroup
              key={ id }
              transitionName="profile"
              transitionAppear
              transitionAppearTimeout={ 500 }
              transitionEnterTimeout={ 500 }
              transitionLeaveTimeout={ 0 }
            >
              <ProfileGroup
                key={id }
                title={title}
                entries={entries}
              />
            </ReactCSSTransitionGroup>
          ))
        }
      </div>
    );
  }
}

ProfileGroupsList.propTypes = {
  groups: PropTypes.array.isRequired,
};

ProfileGroupsList.defaultProps = {
  groups: [],
};
