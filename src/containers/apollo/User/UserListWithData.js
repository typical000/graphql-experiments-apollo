import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import User, {UserList} from '../../../components/User'

const QUERY = gql`
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
`

// TODO: Replace 'refetch' with 'load more profiles'
const UserListWithData = () => (
  <Query query={QUERY}>
    {({data, loading, refetch}) => (
      <UserList
        loading={loading}
        onLoadMoreClick={() => {
          refetch()
        }}
      >
        {data && data.users.map(({id, avatar, screenname, gender, geo: {city}}) => (
          <User
            key={id}
            avatar={avatar}
            screenname={screenname}
            gender={gender}
            city={city}
          />
        ))}
      </UserList>
    )}
  </Query>
)

export default UserListWithData

// Using HOC.
// Throws fatal errors on SSR :(
// =================================================================================
// import React from 'react'
// import PropTypes from 'prop-types'
// import {graphql} from 'react-apollo'
// import gql from 'graphql-tag'
// import User, {UserList} from '../../../components/User'

// // TODO: Replace 'refetch' with 'load more profiles'
// const UserListWithData = ({data: {users, loading, refetch}}) => (
//   <UserList
//     loading={loading}
//     onLoadMoreClick={() => {
//       refetch()
//     }}
//   >
//     {users && users.map(({id, avatar, screenname, gender, geo: {city}}) => (
//       <User
//         key={id}
//         avatar={avatar}
//         screenname={screenname}
//         gender={gender}
//         city={city}
//       />
//     ))}
//   </UserList>
// )

// UserListWithData.propTypes = {
//   // TODO: Make full documentation for apollo prop type
//   data: PropTypes.shape({
//     loading: PropTypes.boolean,
//     error: PropTypes.object,
//   }),
// }

// export default graphql(gql`
//   query {
//     users {
//       id
//       avatar
//       screenname
//       gender
//       geo {
//         city
//       }
//     }
//   }
// `)(UserListWithData)

// =================================================================================
