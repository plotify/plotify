import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import CharacterProfileGroup from './CharacterProfileGroup'
import classNames from 'classnames'
import defaultProfile from '../default-profile'

const CharacterProfile = (props) => {
  const { classes, className } = props
  return (
    <div className={classNames(className, classes.root)}>
      <div className={classes.wrapper}>
        {defaultProfile.map((item, index) => (
          <CharacterProfileGroup
            key={index}
            title={item.title}
            className={classes.profileGroup}
            paperClass={classes.profilePaperClass}>
            {item.entries.filter(entry => !!entry.value).map((entry, i) => (
              <div key={i} className={classes.entry}>
                <TextField
                  className={classes.textField}
                  label={entry.title}
                  defaultValue={entry.value}
                  InputProps={{disableUnderline: true,
                    classes: {
                      input: classes.input
                    }}}
                  InputLabelProps={{className: classes.inputLabel}}
                  disabled
                  fullWidth
                />
              </div>
            ))}
          </CharacterProfileGroup>
        ))}
      </div>
    </div>
  )
}

CharacterProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired
}

const styles = (theme) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      paddingTop: theme.spacing.unit * 2
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
    },
    entry: {
      padding: theme.spacing.unit * 2,
      flex: '2 0 auto'
    },
    textField: {
      maxWidth: '200px'
    },
    input: {
      color: theme.palette.text.primary
    },
    inputLabel: {
      // overflow: 'hidden', // TODO Fehler:  Schneidet das Label auch oben und unten ab.
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }
}

export default withStyles(styles)(CharacterProfile)
