import React from 'react'
import PropTypes from 'prop-types'
import {withApollo} from 'react-apollo'
import {ButtonPrimary} from '../../../components/ui/Button'

const LikeButton = ({children, active, client: {mutate}}) => (
  <ButtonPrimary
    disabled={active}
    onClick={() => {
      console.warn('TODO: Make mutation for "LikeButton"')
    }}
  >
    {children}
  </ButtonPrimary>
)

LikeButton.propTypes = {
  client: PropTypes.object.isRequired, // eslint-disable-line
  children: PropTypes.node,
  active: PropTypes.bool,
}

LikeButton.defaultProps = {
  children: 'Like',
  active: false,
}

export default withApollo(LikeButton)
