import React, {PureComponent} from 'react'
import CONTEXT_TYPES from './contextTypes'

/**
 * Helper method for connecting application data to any component.
 *
 * TODO: But we need to think about HOC's.
 * If we add everywhere inside our components this HOC's it will be
 * ok in future to refactore out components, or now?
 */
const withAppData = (ComponentToWrap) =>
  class WithAppData extends PureComponent {
    static contextTypes = CONTEXT_TYPES

    componentWillReceiveProps() {
      /**
       * Cool trick! When this function goes called current
       * and next props are identical (they are both empty object).
       * But this indicates that GraphQL query was fetched from server.
       * For more info, see "AppDataProvider"
       */
      this.forceUpdate()
    }

    render() {
      const {appData, loading} = this.context

      return (
        <ComponentToWrap {...this.props} appData={appData} loading={loading} />
      )
    }
  }

export default withAppData
