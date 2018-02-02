import gql from 'graphql-tag'
import {DEFAULT_USER_FRAGMENT} from './fragments'

export const OFFSET_USERS_QUERY = gql`
  query OffsetUsers($offset: Int!, $limit: Int!) {
    offsetUsers(offset: $offset, limit: $limit) {
      limitReached
      users {
        ...defaultFields
      }
    }
  }

  ${DEFAULT_USER_FRAGMENT}
`
