import React, { Component } from "react";
import { palette } from "../../themes/PlotifyMainTheme";
import SocialPerson from "material-ui/svg-icons/social/person";
import { PAGES } from "../constants";
import * as s from "../selectors";
import { setPage } from "../actions";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";

const styles = {
  menu: {
    position: "relative",
    height: "100%"
  },
  iconActive: {
    color: palette.alternateTextColor
  },
  menuItem: {},
  active: {
    backgroundColor: palette.primary2Color,
  },
  trash: {
    position: "absolute",
    bottom: 0,
  },
  trashActive: {
    position: "absolute",
    bottom: 0,
    backgroundColor: palette.primary2Color,
    color: palette.alternateTextColor,
  }
};


const mapStateToProps = (state) => {
  return {
    currentPageId: s.getCurrentPageId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetPage: (id) => dispatch(setPage(id))
  };
};

class NavigationComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { currentPageId } = this.props;
    const isCharActive = currentPageId === PAGES.CHARACTERS.id;

    return (
      <div style={styles.menu}>
        <MenuItem
          disabled={ this.props.disabled }
          style={ isCharActive ? styles.active : styles.menuItem }
          leftIcon=
            {
              <SocialPerson
                color={ isCharActive ? styles.iconActive.color : "" }
              />
            }
          onTouchTap={() => this.props.handleSetPage(PAGES.CHARACTERS.id)}/>
      </div>
    );
  }
}

const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationComponent);

export default Navigation;
