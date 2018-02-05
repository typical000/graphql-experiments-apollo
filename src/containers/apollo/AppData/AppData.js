import React from 'react'
import PropTypes from 'prop-types'
import {Query} from 'react-apollo'
import APP_DATA_FULL_QUERY from '../../../graphql/AppData/queries/fullData.graphql'

/**
 * Just a wrapping component, created
 * for avoiding mixing presentation (markup, styles)
 * and backend connection with GraphQL
 */
const AppData = ({children}) => (
  <Query query={APP_DATA_FULL_QUERY}>
    {result => children(result)}
  </Query>
)

AppData.propTypes = {
  children: PropTypes.func.isRequired,
}

export default AppData
