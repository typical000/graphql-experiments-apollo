import React, {PureComponent} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import User, {UserList} from '../../../components/User'

// TODO: Remove unneded 'return' statements

const ITEMS_PER_LOAD = 3 // TODO: Was 5

const QUERY = gql`
  query ($offset: Int!, $limit: Int!) {
    offsetUsers(offset: $offset, limit: $limit) {
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

const UserListWithData = () => (
  <Query
    query={QUERY}
    variables={{
      offset: 0,
      limit: ITEMS_PER_LOAD
    }}
  >
    {({data, loading, fetchMore}) => {

      // const offset = data && data.offsetUsers.length
      // console.log('BEFORE ' + offset)

      return (
        <UserList
          loading={loading}
          onLoadMoreClick={() => {
            /**
             * We don't place handler in separated functon
             * due to need to pass 'fetchMore' function
             * as param to handler.
             */
            const offset = data.offsetUsers.length // TODO: Main problem goes here

            // ==================
            console.log(data)
            // ==================

            // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            fetchMore({
              variables: {
                offset, // TODO: This value doesn't change in time
                limit: ITEMS_PER_LOAD,
              },
              updateQuery: (prevResult, {fetchMoreResult}) => {
                if (!fetchMoreResult) return prevResult
                return Object.assign({}, prevResult, {
                  offsetUsers: [
                    ...prevResult.offsetUsers,
                    ...fetchMoreResult.offsetUsers
                  ]
                })
              }
            })
            // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

          }}
        >
          {data && data.offsetUsers.map(({id, avatar, screenname, gender, geo: {city}}) => (
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
    }}
  </Query>
)

export default UserListWithData
