import React from 'react'
import PropTypes from 'prop-types'
import {withApollo} from 'react-apollo'
import {ButtonPrimary} from '../../../components/ui/Button'
import {APP_DATA_FULL_QUERY} from '../../../graphql/AppData/queries'
import {LOGOUT_MUTATION} from '../../../graphql/Logout/mutations'

const LogoutButton = ({children, client: {mutate}}) => (
  <ButtonPrimary
    onClick={() => {
      /**
       * TODO: Maybe we can move entire object
       * passed in 'mutate' method to
       *
       * src/graphql/mutations
       *
       * Instead of passing only mutation query. Like here:
       * https://github.com/relayjs/relay-examples/tree/master/todo/js/mutations
       *
       * OR
       *
       * Add loader and rename all 'graphql' frolder files to *.graphql. Like here:
       * https://github.com/staylor/graphql-wordpress/tree/master/packages/apollo-wordpress/src/graphql
       */
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
          const data = proxy.readQuery({query: APP_DATA_FULL_QUERY})

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
            query: APP_DATA_FULL_QUERY,
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
