import React from 'react'
import {Switch, Route} from 'react-router-dom'
import UserListWithData from '../../containers/User'
import FeedbackWithData from '../../containers/Feedback'
import {AppDataConsumer} from '../../containers/AppData'
import Container from '../ui/Container'
import Header from '../Header'

const InternalContent = () => (
  <Container>
    <AppDataConsumer>
      {({user}) => <Header user={user}>Test GraphQL application</Header>}
    </AppDataConsumer>
    <Switch>
      <Route exact path="/" component={UserListWithData} />
      <Route path="/feedback" component={FeedbackWithData} />
    </Switch>
  </Container>
)

export default InternalContent
