import React from 'react'
import PropTypes from 'prop-types'
import {Mutation} from 'react-apollo'
import {Button} from '../../components/ui/Button'
// eslint-disable-next-line
import FAVORITE_MUTATION from '../../graphql/Activity/mutations/favorite.graphql'

const FavoriteButton = ({children, active, userId}) => (
  <Mutation
    mutation={FAVORITE_MUTATION}
    variables={{id: userId}}
    optimisticResponse={{
      favorite: {
        id: userId,
        active: true,
        available: true,
        __typename: 'Favorite',
      },
    }}
  >
    {(addToFavorite, {loading}) => (
      <Button disabled={active || loading} onClick={addToFavorite}>
        {children}
      </Button>
    )}
  </Mutation>
)

FavoriteButton.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  userId: PropTypes.string.isRequired,
}

FavoriteButton.defaultProps = {
  children: 'Add to friends',
  active: false,
}

export default FavoriteButton
