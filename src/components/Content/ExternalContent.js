import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'
import Container from '../ui/Container'
import Card from '../ui/Card'
import P from '../typography/P'
import Header from '../Header'

const styles = {
  container: {
    padding: 40,
    textAlign: 'center',
  },
}

const ExternalContent = ({classes}) => (
  <Container>
    <Header>
      {'Test GraphQL application'}
    </Header>
    <Card className={classes.container}>
      <P>{'Sorry, this application works only for choosen ones.'}</P>
      <P>{'You need to find a way to \'Log in\' without \'Log in\' button'}</P>
      <P>{'Have a nice day!'}</P>
    </Card>
  </Container>
)

ExternalContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default injectSheet(styles)(ExternalContent)
