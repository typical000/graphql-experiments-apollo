import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import Button from './Button'

const LinkButton = props => <Button {...props} />

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
}

export default withRouter(LinkButton)
