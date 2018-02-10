import React from 'react'
import PropTypes from 'prop-types'
import {Switch, Route} from 'react-router-dom'
import UserListWithData from '../../containers/User'
import FeedbackWithData from '../../containers/Feedback'
import Container from '../ui/Container'
import Header from '../Header'

const InternalContent = ({user}) => (
  <Container>
    <Header user={user}>
      Test GraphQL application
    </Header>
    <Switch>
      <Route exact path="/" component={UserListWithData} />
      <Route path="/feedback" component={FeedbackWithData} />
    </Switch>
  </Container>
)

InternalContent.propTypes = {
  /**
   * TODO: eslint discourages usage of PropTypes.object
   * Try to use graphlq-anywhere - propType()
   *
   * Docs: https://github.com/apollographql/apollo-client/tree/master/packages/graphql-anywhere
   * Example: https://gist.github.com/stubailo/d7e0171d188c89c2c540a59a2e2a7871
   * But we need to set this queries in some place, and after, include in modules.
   */
  user: PropTypes.object, // eslint-disable-line
}

export default InternalContent
