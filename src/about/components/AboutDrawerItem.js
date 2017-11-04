import React from 'react'
import InfoIcon from 'material-ui-icons/Info'
import DrawerItem from '../../navigation/components/DrawerItem'
import { connect } from 'react-redux'
import { openAboutDialog } from '../actions'

const AboutDrawerItem = (props) => (
  <DrawerItem
    text='Über Plotify'
    icon={<InfoIcon />}
    onClick={props.onOpenAboutDialog} />
)

const mapStateToProps = (state) => {}

const mapDispatchToProps = (dispatch) => ({
  onOpenAboutDialog: () => dispatch(openAboutDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutDrawerItem)
