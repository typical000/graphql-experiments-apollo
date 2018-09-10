import React from 'react'
import {Switch, Route} from 'react-router-dom'
import posed, {PoseGroup} from 'react-pose'
import {UserListWithData, UserWithData} from '../../containers/User'
import NewsfeedWithData from '../../containers/Newsfeed'
import {AppDataConsumer} from '../../containers/AppData'
import Container from '../ui/Container'
import Header from '../Header'

const RouteContainer = posed.div({
  enter: {opacity: 1, delay: 300, beforeChildren: true},
  exit: {opacity: 0},
})

const InternalContent = () => (
  <Route>
    {({location}) => (
      <Container>
        <AppDataConsumer>
          {({user}) => <Header user={user}>Test GraphQL application</Header>}
        </AppDataConsumer>
        <PoseGroup>
          <RouteContainer key={location.key || 'first'}>
            <Switch location={location}>
              <Route exact path="/" component={UserListWithData} key="search" />
              <Route path="/user/:id" component={UserWithData} key="user" />
              <Route
                path="/newsfeed"
                component={NewsfeedWithData}
                key="newsfeed"
              />
            </Switch>
          </RouteContainer>
        </PoseGroup>
      </Container>
    )}
  </Route>
)

export default InternalContent
