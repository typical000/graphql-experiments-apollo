import React from 'react'
import PropTypes from 'prop-types'
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {GRAPHQL_SERVER} from '../../constants/url'

const client = new ApolloClient({
  link: new HttpLink({
    /**
     * By default all requests are directed to '/graphql'
     * but we have server on other port of localhost
     */
    fetch: (uri, options) => fetch(GRAPHQL_SERVER + uri, options),
  }),
  cache: new InMemoryCache()
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
