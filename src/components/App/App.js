import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter} from 'react-router-dom' // TODO: Move to client.js
import {compose} from 'react-apollo'
import injectSheet from '../../utils/jss'
import GlobalStyles from '../GlobalStyles'
import Loader from '../ui/Loader'
import {withAppData} from '../../containers/AppData'
import {InternalContent, ExternalContent} from '../Content'

const styles = theme => ({
  app: {
    background: theme.common.page,
    color: theme.text.default,
    minHeight: '100vh',
    paddingTop: 80,
    paddingBottom: 40,
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
    appData: PropTypes.object, // eslint-disable-line
    loading: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isClient: false,
    }
  }

  /**
   * Setting state in componentDidMount is an antipattern,
   * and causes double component render on client.
   *
   * But it's only one solution to avoid render something
   * in SSR (in this case some GraphQL component will break deployment)
   */
  componentDidMount() {
    // eslint-disable-next-line
    this.setState({isClient: true})
  }

  renderContent() {
    const {loading, appData} = this.props
    const {isClient} = this.state

    // Indicates, that query isn't already fetched from server
    // @see AppDataProvider
    if (!isClient || loading) return <Loader fullScreen active />
    if (appData.guest) return <ExternalContent />
    // TODO: Remove user from passing down
    return <InternalContent />
  }

  render() {
    const {classes} = this.props

    return (
      <BrowserRouter>
        <GlobalStyles>
          <div className={classes.app}>
            {this.renderContent()}
          </div>
        </GlobalStyles>
      </BrowserRouter>
    )
  }
}

export default compose(
  withAppData,
  injectSheet(styles),
)(App)
