import React from "react";
import MenuItem from "material-ui/MenuItem";
import SocialPerson from "material-ui/svg-icons/social/person";
import ActionDelete from "material-ui/svg-icons/action/delete";
import {palette} from "../../themes/PlotifyMainTheme";
import Pages from "../../constants/pages";

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

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.goToCharacters = this.goToCharacters.bind(this);
    this.goToTrash = this.goToTrash.bind(this);
  }

  goToCharacters() {
    this.props.onChangePage(Pages.CHARACTER);
  }

  goToTrash() {
    this.props.onChangePage(Pages.TRASH);
  }

  render() {
    const {currentPage} = this.props;
    return (
      <div style={styles.menu}>
        <MenuItem
          style={ currentPage === Pages.CHARACTER ? styles.active : styles.menuItem }
          leftIcon={
            <SocialPerson
              color={ currentPage === Pages.CHARACTER ? styles.iconActive.color : "" }
            />
          }
          onTouchTap={this.goToCharacters}/>
        <MenuItem
          style={ currentPage === Pages.TRASH ? styles.trashActive : styles.trash }
          leftIcon={
            <ActionDelete
              color={ currentPage === Pages.TRASH ? styles.iconActive.color : "" }
            />
          }
          onTouchTap={this.goToTrash}/>
      </div>
    );
  }
}

Navigation.propTypes = {
  onChangePage: React.PropTypes.func.isRequired,
};