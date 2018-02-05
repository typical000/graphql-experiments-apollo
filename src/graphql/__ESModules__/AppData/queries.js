import gql from 'graphql-tag'
import {DEFAULT_USER_FRAGMENT} from '../User/fragments'

export const APP_DATA_FULL_QUERY = gql`
  query AppData {
    appData {
      guest
      user {
        ...defaultFields
      }
    }
  }

  ${DEFAULT_USER_FRAGMENT}
`
