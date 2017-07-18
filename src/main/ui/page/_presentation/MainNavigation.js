import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavigationLink } from "../../mdl-components/Layout/";
import Divider from "./Divider";
import { PAGES } from "../constants";

export default class MainNavigation extends PureComponent {
  render() {
    return (
      <div className="plotify-main-navigation">
        {
          this.props.containsActions &&
          <span>
            <NavigationLink
              onClick={() => console.log("nothing")}
              caption="Neue Geschichte"
              icon="new_releases" />

            <NavigationLink
              caption="Geschichte öffnen"
              onClick={ this.props.handleOpenStory }
              icon="folder"
            />
            <Divider />
          </span>
        }

        <NavigationLink
          caption="Charaktere"
          onClick={ this.props.toCharacters }
          icon="person"
          disabled={ !this.props.characters }
          active={ this.props.currentPageId === PAGES.CHARACTERS.id }
        />

        <NavigationLink
          caption="Gruppen"
          onClick={ () => console.log("") }
          icon="people"
          disabled={ !this.props.groups }
        />

        <NavigationLink
          caption="Beziehungen"
          onClick={ () => console.log("") }
          icon="compare_arrows"
          disabled={ !this.props.relations }
        />

        <NavigationLink
          caption="Gegenstände"
          onClick={ () => console.log("") }
          icon="card_travel"
          disabled={ !this.props.objects }
        />

        <NavigationLink
          caption="Handlungsorte"
          onClick={ () => console.log("") }
          icon="location_on"
          disabled={ !this.props.places }
        />

        <NavigationLink
          caption="Szenen"
          onClick={ this.props.toScenes }
          icon="image"
          disabled={ !this.props.scenes }
        />

        <Divider />

        <NavigationLink
          caption="Papierkorb"
          onClick={ () => console.log("") }
          icon="delete"
        />

        <Divider />

        <NavigationLink
          caption="Einstellungen"
          onClick={ () => console.log("") }
          icon="settings" />
      </div>
    );
  }
}

MainNavigation.propTypes = {
  handleCreateStory: PropTypes.func,
  handleOpenStory:   PropTypes.func,
  toCharacters:      PropTypes.func,
  characters:        PropTypes.bool,
  groups:            PropTypes.bool,
  relations:         PropTypes.bool,
  objects:           PropTypes.bool,
  places:            PropTypes.bool,
  scenes:            PropTypes.bool,
  containsActions:   PropTypes.bool,
  currentPageId:     PropTypes.string,
};

MainNavigation.defaultProps = {};
