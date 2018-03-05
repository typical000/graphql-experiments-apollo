import React from 'react'
import {Query} from 'react-apollo'
import {isEmpty} from 'lodash'
import {User, UserList} from '../../components/User'
import OFFSET_USERS_QUERY from '../../graphql/User/queries/offsetUsers.graphql'

const ITEMS_PER_LOAD = 6

const UserListWithData = () => (
  <Query
    query={OFFSET_USERS_QUERY}
    variables={{
      offset: 0,
      limit: ITEMS_PER_LOAD,
    }}
  >
    {({data, loading, fetchMore}) => {
      // If no data - just avoid rendering
      if (isEmpty(data)) return <div />

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
                      ...fetchMoreResult.offsetUsers.users,
                    ],
                    limitReached: fetchMoreResult.offsetUsers.limitReached,
                  }),
                })
              },
            })
          }}
        >
          {data.offsetUsers.users.map(
            ({id, avatar, screenname, gender, geo: {city}, actions}) => (
              <User
                key={id}
                avatar={avatar}
                screenname={screenname}
                gender={gender}
                actions={actions}
                city={city}
              />
            ),
          )}
        </UserList>
      )
    }}
  </Query>
)

export default UserListWithData
