import React from 'react'
import PropTypes from 'prop-types'
import {withApollo} from 'react-apollo'
import {ButtonPrimary} from '../../components/ui/Button'
import LIKE_MUTATION from '../../graphql/Activity/mutations/like.graphql'

const LikeButton = ({children, active, userId, client: {mutate}}) => (
  <ButtonPrimary
    disabled={active}
    onClick={() => {
      mutate({
        mutation: LIKE_MUTATION,
        variables: {id: userId},

        /**
         * Instantly change UI with supposed data that we will receive from server later.
         * This data will be passed to update method above.
         */
        optimisticResponse: {
          like: {
            id: userId,
            active: true,
            available: true,
            __typename: 'Like',
          },
        },
      })
    }}
  >
    {children}
  </ButtonPrimary>
)

LikeButton.propTypes = {
  client: PropTypes.object.isRequired, // eslint-disable-line
  children: PropTypes.node,
  active: PropTypes.bool,
  userId: PropTypes.number.isRequired,
}

LikeButton.defaultProps = {
  children: 'Like',
  active: false,
}

export default withApollo(LikeButton)
