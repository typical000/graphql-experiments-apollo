import React from 'react'
import PropTypes from 'prop-types'
import {withApollo} from 'react-apollo'
import {Button} from '../../components/ui/Button'
import FAVORITE_MUTATION from '../../graphql/Activity/mutations/favorite.graphql'

const FavoriteButton = ({children, active, userId, client: {mutate}}) => (
  <Button
    disabled={active}
    onClick={() => {
      mutate({
        mutation: FAVORITE_MUTATION,
        variables: {id: userId},

        /**
         * Instantly change UI with supposed data that we will receive from server later.
         * This data will be passed to update method above.
         */
        optimisticResponse: {
          favorite: {
            id: userId,
            active: true,
            available: true,
            __typename: 'Favorite',
          },
        },
      })
    }}
  >
    {children}
  </Button>
)

FavoriteButton.propTypes = {
  client: PropTypes.object.isRequired, // eslint-disable-line
  children: PropTypes.node,
  active: PropTypes.bool,
  userId: PropTypes.string.isRequired,
}

FavoriteButton.defaultProps = {
  children: 'Add to friends',
  active: false,
}

export default withApollo(FavoriteButton)
