import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Entry from "../_containers/Entry";
import { Card, CardSupportingText, CardTitle } from "../../../mdl-components/Card/";

class ProfileGroup extends PureComponent {

  render() {
    return (
      <Card className="plotify-profile-group">
        <CardTitle>{this.props.title}</CardTitle>
        <CardSupportingText>
          {
            this.props.entries.map((entry) => {
              return (
                <Entry
                  entryId={entry.id}
                  id={entry.id}
                  title={entry.title}
                  key={entry.id} />
              );
            })
          }
        </CardSupportingText>
      </Card>
    );
  }
}

export default ProfileGroup;

ProfileGroup.propTypes = {
  title:   PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
};

ProfileGroup.defaultProps = {
  entries: []
};
