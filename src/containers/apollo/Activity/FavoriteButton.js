import React from 'react'
import PropTypes from 'prop-types'
import {withApollo} from 'react-apollo'
import {Button} from '../../../components/ui/Button'

const FavoriteButton = ({children, active, client: {mutate}}) => (
  <Button
    disabled={active}
    onClick={() => {
      console.warn('TODO: Make mutation for "FavoriteButton"')
    }}
  >
    {children}
  </Button>
)

FavoriteButton.propTypes = {
  client: PropTypes.object.isRequired, // eslint-disable-line
  children: PropTypes.node,
  active: PropTypes.bool,
}

FavoriteButton.defaultProps = {
  children: 'Add to friends',
  active: false,
}

export default withApollo(FavoriteButton)
