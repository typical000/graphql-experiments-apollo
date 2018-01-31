import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import User, {UserList} from '../../../components/User'

// TODO: Replace 'refetch' with 'load more profiles'
const UserListWithData = ({data: {users, loading, refetch}}) => (
  <UserList
    loading={loading}
    onLoadMoreClick={() => {
      refetch()
    }}
  >
    {users && users.map(({id, avatar, screenname, gender, geo: {city}}) => (
      <User
        key={id}
        avatar={avatar}
        screenname={screenname}
        gender={gender}
        city={city}
      />
    ))}
  </UserList>
)

UserListWithData.propTypes = {
  // TODO: Make full documentation for apollo prop type
  data: PropTypes.shape({
    loading: PropTypes.boolean,
    error: PropTypes.object,
  }),
}

export default graphql(gql`
  query {
    users {
      id
      avatar
      screenname
      gender
      geo {
        city
      }
    }
  }
`)(UserListWithData)
