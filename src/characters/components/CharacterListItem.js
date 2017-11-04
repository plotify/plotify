import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import classNames from 'classnames'

function CharacterListItem (props) {
  const { classes, character, onClick, selected } = props
  const className = classNames(classes.listItem, { [classes.selectedListItem]: selected })
  const borderClassName = classNames(classes.leftBorder, { [classes.selectedLeftBorder]: selected })
  return (
    <ListItem className={className} onClick={onClick} button>
      <div className={borderClassName} />
      <ListItemAvatar>
        <Avatar>{character.name.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.characterName}
        primary={character.name} />
    </ListItem>
  )
}

CharacterListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool
}

const styles = theme => {
  const light = theme.palette.type === 'light'

  const top = light ? 600 : 700
  const bottom = light ? 100 : 500

  const backgroundColor = light ? theme.palette.primary['50'] : theme.palette.background.contentFrame
  const borderColor = light ? theme.palette.primary['700'] : theme.palette.grey[600]

  return {
    listItem: {
      height: theme.spacing.unit * 7
    },
    selectedListItem: {
      backgroundColor: backgroundColor,
      boxShadow: 'inset 0 1px 1px -1px ' + theme.palette.grey[top] + ',' +
                 'inset 0 -1px 1px -1px ' + theme.palette.grey[bottom],
      '&:hover': {
        backgroundColor: backgroundColor,
        cursor: 'default'
      }
    },
    leftBorder: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: 0,
      backgroundColor: borderColor
    },
    selectedLeftBorder: {
      width: theme.spacing.unit / 2,
      transition: theme.transitions.create('width', { duration: theme.transitions.duration.shortest })
    },
    characterName: {
      display: 'flex',
      alignItems: 'center',
      height: theme.spacing.unit * 6,
      '& h3': {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical'
      }
    }
  }
}

export default withStyles(styles)(CharacterListItem)
