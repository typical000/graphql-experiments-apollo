import gql from 'graphql-tag'

export const DEFAULT_USER_FRAGMENT = gql`
  fragment defaultFields on User {
    id
    screenname
    avatar
    gender
    geo {
      city
      country
    }
  }
`
