import React from 'react'
import PropTypes from 'prop-types'
import {ApolloConsumer} from 'react-apollo'
import {ButtonPrimary} from '../../components/ui/Button'
import APP_DATA_GUEST_QUERY from '../../graphql/AppData/queries/guestData.graphql'
import LOGOUT_MUTATION from '../../graphql/Logout/mutations/logout.graphql'

const LogoutButton = ({children}) => (
  <ApolloConsumer>
    {({mutate}) => (
      <ButtonPrimary
        onClick={() => {
          mutate({
            mutation: LOGOUT_MUTATION,

            /**
             * The esiest way - after mutation call 'refetchQueries' property
             * that will cause more server calls for actualizing store state.
             *
             * But the most negative thing is that mutation already sends data
             * that we need to change directly in cache.
             * Anyway, if you want to try, uncomment this code:
             *
             * refetchQueries: [{query: APP_DATA_FULL_QUERY}]
             *
             * The more correct way is to update cache
             * with your hande like here:
             */
            update: (proxy, {data: {logout}}) => {
              const data = proxy.readQuery({query: APP_DATA_GUEST_QUERY})

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
                query: APP_DATA_GUEST_QUERY,
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
    )}
  </ApolloConsumer>
)

LogoutButton.propTypes = {
  children: PropTypes.node,
}

LogoutButton.defaultProps = {
  children: 'Logout'
}

export default LogoutButton
