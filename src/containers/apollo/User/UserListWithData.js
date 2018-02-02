import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import {User, UserList} from '../../../components/User'

const ITEMS_PER_LOAD = 5

const QUERY = gql`
  query OffsetUsers($offset: Int!, $limit: Int!) {
    offsetUsers(offset: $offset, limit: $limit) {
      limitReached
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
      // If no data - just avoid rendering
      if (!data) return <div />

      return (
        <UserList
          loading={loading}
          limitReached={data.offsetUsers.limitReached}
          onLoadMoreClick={(offset) => {
            /**
             * We don't place handler in separated functon
             * due to need to pass 'fetchMore' function
             * as param to handler.
             */
            fetchMore({
              variables: {
                offset,
                limit: ITEMS_PER_LOAD,
              },
              updateQuery: (prevResult, {fetchMoreResult}) => {
                if (!fetchMoreResult) return prevResult
                /**
                 * Apollo doesn't do work for you in case of updating query.
                 * We need to manually extend previous data with new data
                 * to make new object that will be returned as new data
                 */
                return Object.assign({}, prevResult, {
                  offsetUsers: Object.assign({}, prevResult.offsetUsers, {
                    users: [
                      ...prevResult.offsetUsers.users,
                      ...fetchMoreResult.offsetUsers.users
                    ],
                    limitReached: fetchMoreResult.offsetUsers.limitReached
                  })
                })
              }
            })
          }}
        >
          {data.offsetUsers.users.map(({id, avatar, screenname, gender, geo: {city}}) => (
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
