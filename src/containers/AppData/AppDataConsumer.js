import {PureComponent} from 'react'
import PropTypes from 'prop-types'
import CONTEXT_TYPES from './contextTypes'

/**
 * Another type of realization of function, that connects
 * provider with child components.
 *
 * Instead of HOC realization this component follows 'Render Props' pattern
 * See: https://reactjs.org/docs/render-props.html
 */
class AppDataConsumer extends PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  static contextTypes = CONTEXT_TYPES

  render() {
    const {appData, loading} = this.context
    return this.props.children(appData, loading)
  }
}

export default AppDataConsumer
