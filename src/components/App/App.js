import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import GlobalStyles from '../GlobalStyles'
import injectSheet from '../../utils/jss'

const styles = theme => ({
  app: {

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
          Application
        </div>
      </GlobalStyles>
    )
  }
}

export default injectSheet(styles)(App)
