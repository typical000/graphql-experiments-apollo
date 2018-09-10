/* @flow */

import React, {PureComponent} from 'react'
import {withRouter} from 'react-router'
import type {Classes} from 'react-jss'
import {compose} from 'react-apollo'
import injectSheet from '../../utils/jss'
import GlobalStyles from '../GlobalStyles'
import Loader from '../ui/Loader'
import {withAppData} from '../../containers/AppData'
import {InternalContent, ExternalContent} from '../Content'

const styles = (theme) => ({
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
    },
  },
})

type Props = {
  classes: Classes,
  appData: {[string]: boolean},
  loading?: boolean,
}

type State = {
  isClient: boolean,
}

class App extends PureComponent<Props, State> {
  static defaultProps = {
    loading: false,
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

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  renderContent() {
    const {loading, appData} = this.props
    const {isClient} = this.state

    /**
     * Indicates, that query isn't already fetched from server
     * @see AppDataProvider
     */
    if (!isClient || loading) return <Loader fullScreen active />
    if (appData.guest) return <ExternalContent />

    /**
     * Here data is already availble and we can pass appData.user data down
     * in this component for showing logged-in header (and it will be good).
     * But, for presentation of AppDataConsumer we don't pass data and
     * retrive data in inner component from consumer.
     */
    return <InternalContent />
  }

  render() {
    const {classes} = this.props

    return (
      <GlobalStyles>
        <div className={classes.app}>{this.renderContent()}</div>
      </GlobalStyles>
    )
  }
}

export default compose(withRouter, withAppData, injectSheet(styles))(App)
