import React from 'react'
import {Query} from 'react-apollo'
import InfiniteScroll from 'react-infinite-scroller'
import {isEmpty} from 'lodash'
import {User, UserList, LoadingMore} from '../../components/User'
import OFFSET_USERS_QUERY from '../../graphql/User/queries/offsetUsers.graphql'

/**
 * Items per one load
 * @const
 */
const ITEMS_PER_LOAD = 48

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
        <InfiniteScroll
          loadMore={() => {
            // Set timeout is just for testing loader
            setTimeout(() => {
              fetchMore({
                variables: {
                  offset: data.offsetUsers.users.length,
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
            }, 500)
          }}
          hasMore={!data.offsetUsers.limitReached}
          loader={<LoadingMore key={1} />}
        >
          <UserList loading={loading}>
            {data.offsetUsers.users.map(
              ({id, avatar, screenname, gender, geo: {city}, actions}) => (
                <User
                  key={id}
                  id={id}
                  avatar={avatar}
                  screenname={screenname}
                  gender={gender}
                  actions={actions}
                  city={city}
                />
              ),
            )}
          </UserList>
        </InfiniteScroll>
      )
    }}
  </Query>
)

export default UserListWithData
