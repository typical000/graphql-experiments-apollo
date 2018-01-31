import React from 'react'
import PropTypes from 'prop-types'
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {BatchHttpLink} from 'apollo-link-batch-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {GRAPHQL_SERVER} from '../../constants/url'

const client = new ApolloClient({
  /**
   * Using BatchHttpLink over classic HttpLink for making query batching real.
   * see: https://www.apollographql.com/docs/link/links/batch-http.html
   *
   * But we need to test it.
   */
  link: new BatchHttpLink({
    uri: `${GRAPHQL_SERVER}/graphql`,
  }),

  cache: new InMemoryCache(),

  /**
   * Enable Server-side rendering. But need testing
   * see: https://github.com/apollographql/apollo-client/blob/master/docs/source/recipes/server-side-rendering.md#server-side-rendering
   */
  ssrMode: true,

  /**
   * Enable debugging on producton build.
   * But it steel doesn't work on both DEV and PROD envs, don't know why :D
   */
  connectToDevTools: process.env.NODE_ENV === 'production',
})

const GraphQLProvider = ({children}) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)

GraphQLProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GraphQLProvider
