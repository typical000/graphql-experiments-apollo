import React from 'react'
import PropTypes from 'prop-types'
import {Query} from 'react-apollo'
import USER_QUERY from '../../graphql/User/queries/user.graphql'
import {UserPage} from '../../components/User'

const UserWithData = ({match}) => {
  const {id} = match.params

  return (
    <Query query={USER_QUERY} variables={{id}}>
      {({data, loading}) => {
        // If no data - just avoid rendering
        if (loading) return null
        const {user} = data
        return (
          <UserPage
            screenname={user.screenname}
            avatar={user.avatar}
            gender={user.gender}
            city={user.geo.city}
            country={user.geo.country}
            actions={user.actions}
          />
        )
      }}
    </Query>
  )
}

UserWithData.propTypes = {
  // Passed from router
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

export default UserWithData
