import React from 'react'
import PropTypes from 'prop-types'
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {BatchHttpLink} from 'apollo-link-batch-http'
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'
import {GRAPHQL_SERVER} from '../constants/url'
import introspectionQueryResultData from '../fragmentTypes.json'

/**
 * Need to use for fragment matching (UNIONS and INTERFACES)
 * https://www.apollographql.com/docs/react/recipes/fragment-matching.html
 */
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

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

  cache: new InMemoryCache({
    fragmentMatcher,
    // dataIdFromObject: object => object.id,
    dataIdFromObject: (obj) => {
      if (obj.id) {
        if (obj.__typename) return obj.__typename + obj.id
        return obj.id
      }
      return null
    }
  }),

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

  addTypeName: true,
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
