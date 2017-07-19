import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Card, CardSupportingText } from "../../mdl-components/Card";
import classNames from "classnames";

// todo
export default class NewWelcomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      new: 2,
      open: 2,
    }
  }
  render() {
    return (
      <div className="plotify-welcome-section">
        <div className="welcome-flex-box">

          <div className="plotify-info-version">
            <div className="info-logo">
              <img src={ this.props.logoUrl } />
            </div>
            <div className="version-description">
              <h4>
                { this.props.versionName }
              </h4>
              <p>
                { this.props.versionDescription }
              </p>
            </div>
          </div>
          <div className="actions-flex-box">
            <Card className="actions-card">
              <CardSupportingText>
                <div className={ classNames("action-panel", "new-story", `mdl-shadow--${this.state.new}dp`) }
                     onMouseOver={ () => this.setState({ new: 8})}
                     onMouseOut={ () => this.setState({ new: 2})}
                     onClick={ this.props.createStory }>
                  <img src={ this.props.newStoryIconUrl } width="120" />
                  <h5>{ this.props.newStoryLabel }</h5>
                  <p>
                    Erstelle jetzt eine neue Geschichte <br/> und fange sofort an zu plotten.
                  </p>
                </div>
                <div className={ classNames("action-panel", "open-story", `mdl-shadow--${this.state.open}dp`) }
                     onMouseOver={ () => this.setState({ open: 8})}
                     onMouseOut={ () => this.setState({ open: 2})}
                     onClick={ this.props.openStory }>
                  <img src={ this.props.openStoryIconUrl } width="120" />
                  <h5>{ this.props.openStoryLabel }</h5>
                  <p>
                    Öffne einer deiner bereits begonnen <br/> fantastischen Geschichten.
                  </p>
                </div>
              </CardSupportingText>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

NewWelcomePage.propTypes = {
  logoUrl:            PropTypes.string.isRequired,
  versionName:        PropTypes.string.isRequired,
  versionDescription: PropTypes.string.isRequired,
  newStoryIconUrl:    PropTypes.string.isRequired,
  newStoryLabel:      PropTypes.string.isRequired,
  openStoryIconUrl:   PropTypes.string.isRequired,
  openStoryLabel:     PropTypes.string.isRequired,
  createStory:        PropTypes.func.isRequired,
  openStory:          PropTypes.func.isRequired,
};

NewWelcomePage.defaultProps = {};
