import { getProfileGroupById, isCharacterEditModeEnabled } from '../selectors'

import CharacterProfileEntry from './CharacterProfileEntry'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

const CharacterProfileGroup = (props) => {
  const { className, group, classes, paperClass, editMode } = props
  const isVisible = editMode || group.entries.filter(entry => !!entry.value).length !== 0
  if (!isVisible) {
    return null
  } else {
    return (
      <div className={classNames(className, classes.wrapper)}>
        <Typography
          type='title'
          className={classes.title}
          gutterBottom>
          {group.title}
        </Typography>
        <Paper className={paperClass}>
          {group
            .entries
            .filter(entry => !!entry.value)
            .map((entry, i) => (
              <CharacterProfileEntry
                className={classes.profileEntry}
                entry={entry}
                key={i}
                disabled={!editMode}
              />
            ))}
        </Paper>
      </div>
    )
  }
}

CharacterProfileGroup.propTypes = {
  className: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  paperClass: PropTypes.string
}

const styles = (theme) => ({
  wrapper: {
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit / 2
  },
  hidden: {
    display: 'none'
  },
  profileEntry: {
    width: '50%',
    boxSizing: 'border-box',
    flex: '2 0 auto'
  }
})

const mapStateToProps = (state, ownProps) => ({
  editMode: isCharacterEditModeEnabled(state),
  group: getProfileGroupById(state, ownProps.groupId)
})

export default connect(mapStateToProps)(withStyles(styles)(CharacterProfileGroup))
