import React from 'react'
import PropTypes from 'prop-types'
import {withApollo} from 'react-apollo'
import gql from 'graphql-tag'
import {ButtonPrimary} from '../../../components/ui/Button'

const APPDATA_QUERY = gql`
  query AppData {
    appData {
      guest
      user {
        id
        gender
        screenname
        avatar
        geo {
          city
          country
        }
      }
    }
  }
`

const MUTATION = gql`
  mutation {
    logout {
      guest
    }
  }
`

const LogoutButton = ({children, client: {mutate}}) => (
  <ButtonPrimary
    onClick={() => {
      mutate({
        mutation: MUTATION,

        /**
         * The esiest way - after mutation call 'refetchQueries' property
         * that will cause more server calls for actualizing store state.
         *
         * But the most negative thing is that mutation already sends data
         * that we need to change directly in cache.
         * Anyway, if you want to try, uncomment this code:
         *
         * refetchQueries: [{query: APPDATA_QUERY}]
         *
         * The more correct way is to update cache
         * with your hande like here:
         */
        update: (proxy, {data: {logout}}) => {
          const data = proxy.readQuery({query: APPDATA_QUERY})

          /**
           * Yep, I'll like spread operators instead of this assign hell:
           *
           * data = Object.assign({}, data, {
           *   appData: Object.assign({}, data.appData, {
           *     guest: logout.guest
           *   })
           * })
           */
          proxy.writeQuery({
            query: APPDATA_QUERY,
            data: {
              ...data,
              appData: {
                ...data.appData,
                guest: logout.guest
              }
            }
          })
        }

      })
    }}
  >
    {children}
  </ButtonPrimary>
)

LogoutButton.propTypes = {
  client: PropTypes.object.isRequired, // eslint-disable-line
  children: PropTypes.node,
}

LogoutButton.defaultProps = {
  children: 'Logout'
}

export default withApollo(LogoutButton)
