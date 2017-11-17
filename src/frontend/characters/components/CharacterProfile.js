import CharacterProfileGroup from './CharacterProfileGroup'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { getProfile } from '../selectors'
import { withStyles } from 'material-ui/styles'

const CharacterProfile = ({ classes, className, profile }) => {
  return (
    <div className={classNames(className, classes.root)}>
      <div className={classes.wrapper}>
        {profile.map((item, index) => (
          <CharacterProfileGroup
            key={index}
            groupId={item.id}
            className={classes.profileGroup}
            paperClass={classes.profilePaperClass} />
        ))}
      </div>
    </div>
  )
}

const styles = (theme) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      boxSizing: 'border-box'
    },
    wrapper: {
      flex: '0.5 0.1 400px'
    },
    profileGroup: {
      padding: theme.spacing.unit * 2
    },
    profilePaperClass: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '850px' // Maximale Breite zu Testzwecken in der Demo.
    }
  }
}

CharacterProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  profile: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  profile: getProfile(state)
})

export default connect(mapStateToProps)(withStyles(styles)(CharacterProfile))
