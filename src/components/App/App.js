import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import GlobalStyles from '../GlobalStyles'
import Container from '../ui/Container'
import Header from '../Header'
import User from '../User'
import injectSheet from '../../utils/jss'

const styles = theme => ({
  app: {
    background: theme.common.page,
    color: theme.text.default,
    minHeight: '100vh',
    paddingTop: 80,
    font: {
      family: theme.typography.fontFamily,
      size: theme.typography.fontSize,
      lineHeight: theme.typography.lineHeight,
    }
  }
})

class App extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  render() {
    const {classes} = this.props

    return (
      <GlobalStyles>
        <div className={classes.app}>
          <Header>
            Test GraphQL application
          </Header>
          <Container>
            <User
              avatar={'http://bezkota.ru/wp-content/uploads/2016/03/dzhimo-kot-s-samymi-bolshimi-glazami-v-mire-08.jpg'}
              screenname={'SomeUser'}
              gender={1}
              city={'New York'}
            />
          </Container>
        </div>
      </GlobalStyles>
    )
  }
}

export default injectSheet(styles)(App)
