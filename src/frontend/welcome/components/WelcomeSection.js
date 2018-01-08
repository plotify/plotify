import AppIcon from './AppIcon'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import RecentFilesList from '../recent-files/components/RecentFilesList'
import Section from '../../navigation/components/Section'
import StarterList from './StarterList'
import Typography from 'material-ui/Typography'
import { WELCOME_SECTION } from '../constants'
import { withStyles } from 'material-ui/styles'

const WelcomeSection = (props) => {
  const { classes } = props
  return (
    <Section id={WELCOME_SECTION} hideAppBar>
      <div className={classes.wrapper}>
        <AppIcon className={classes.icon} />
        <Paper className={classes.card}>
          <StarterList />
        </Paper>
        <Typography className={classes.title} type='title'>Zuletzt verwendet</Typography>
        <RecentFilesList listClassName={classes.card} />
      </div>
    </Section>
  )
}

WelcomeSection.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = theme => ({
  wrapper: {
    margin: '0 auto',
    maxWidth: 600
  },
  icon: {
    width: 96,
    height: 96,
    display: 'block',
    margin: '0 auto',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  },
  title: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4
  },
  card: {
    margin: theme.spacing.unit * 2
  }
})

export default withStyles(styles)(WelcomeSection)
