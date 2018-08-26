import React from 'react'
import {MockedProvider} from 'react-apollo/test-utils'
import {
  mountWithJss as mount,
  extractFromJssWrapper,
} from '../../../utils/testSuite'
import LogoutButton from '../LogoutButton'
import MOCKS from '../__mocks__/logoutButton.mocks'
import APP_DATA_GUEST_QUERY from '../../../graphql/AppData/queries/guestData.graphql'

describe('LogoutButton', () => {
  it('User must became guest after click', (done) => {
    /**
     * There is a problem when we want to use or make queries
     * that contain nested fragmens. We'll receive similar warnings:
     *
     *   console.warn node_modules/apollo-cache-inmemory/lib/bundle.umd.js:26
     *   You're using fragments in your queries, but either don't have the addTypename:
     *   true option set in Apollo Client, or you are trying to write a fragment to the
     *   store without the __typename.
     *   Please turn on the addTypename option and include __typename when writing
     *   fragments so that Apollo Client
     *   can accurately match fragments.
     *
     *   console.warn node_modules/apollo-cache-inmemory/lib/bundle.umd.js:27
     *   Could not find __typename on Fragment  Geo { city: 'Some shitty city', country: 'UKR' }
     *
     *   console.warn node_modules/apollo-cache-inmemory/lib/bundle.umd.js:28
     *   DEPRECATION WARNING: using fragments without __typename is unsupported behavior and
     *   will be removed in future versions of Apollo client. You should fix this and set
     *   addTypename to true now.
     *
     * The solution will be to make pullrequest to react-apollo, or
     * using simplified queries (just because tests DON'T need real things)
     */
    const wrap = mount(
      <MockedProvider mocks={MOCKS}>
        <LogoutButton />
      </MockedProvider>,
    )

    // Get access to real client object
    const client = extractFromJssWrapper(wrap).props().client

    /**
     * Write user data to server because we can't logout
     * before application data was fetched
     */
    client.writeQuery({
      query: APP_DATA_GUEST_QUERY,
      data: {
        appData: {
          guest: false,
          __typename: 'AppData',
        },
      },
    })

    /**
     * Find logout button and imitate click on it
     * for initiating logout mutation
     */
    wrap.find('Button').simulate('click')

    // Wait until data arrive due to async nature of sending mutation to server
    setTimeout(() => {
      const data = client.readQuery({query: APP_DATA_GUEST_QUERY})
      expect(data).toMatchSnapshot()
      done()
    }, 10)
  })
})
