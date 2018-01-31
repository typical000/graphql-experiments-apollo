import React from 'react'
import PropTypes from 'prop-types'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

/**
 * Just a wrapping component, created
 * for avoiding mixing presentation (markup, styles)
 * and backend connection with GraphQL
 */

const QUERY = gql`
  query {
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

const AppData = ({children}) => (
  <Query query={QUERY}>
    {result => children(result)}
  </Query>
)

AppData.propTypes = {
  children: PropTypes.func.isRequired,
}

export default AppData
