import {PureComponent, Children} from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import APP_DATA_FULL_QUERY from '../../graphql/AppData/queries/fullData.graphql'

/**
 * Main application configuration data provider
 * Holds inside current user settings, data about availability
 * of any functionality, and, other utils stuff.
 *
 * NOTE: It's better to store such entities inside providers, instead
 * of simple wrapping containers due to the fact, that you can
 * add here functions such 'refetch' or 'send' (for e.g.), useful to communicate
 * between your application data on client and server.
 * And, you can pass them through your HOC's or consumers.
 *
 * TODO: Consider when react 16.3.0 will be released
 * to rewrite this code to the new context API.
 */
class AppDataProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.shape({
      appData: PropTypes.object,
      loading: PropTypes.bool.isRequired,
    })
  }

  static childContextTypes = {
    appData: PropTypes.object,
    loading: PropTypes.bool.isRequired,
  }

  getChildContext() {
    const {appData, loading} = this.props.data
    return {appData, loading}
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default graphql(APP_DATA_FULL_QUERY)(AppDataProvider)
