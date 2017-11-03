import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function CharacterProfile (props) {
  const { className } = props
  return (
    <div className={className}>Platzhalter</div>
  )
}

CharacterProfile.propTypes = {
  className: PropTypes.string.isRequired
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterProfile)
