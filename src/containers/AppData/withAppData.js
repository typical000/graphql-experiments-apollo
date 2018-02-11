import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

/**
 * Helper method for connecting application data to any component.
 *
 * TODO: But we need to think about HOC's.
 * If we add everywhere inside our components this HOC's it will be
 * ok in future to refactore out components, or now?
 */
const withAppData = ComponentToWrap => (
  class WithAppData extends PureComponent {

    static contextTypes = {
      appData: PropTypes.object,
      loading: PropTypes.bool.isRequired,
    }

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
      return (
        <ComponentToWrap
          {...this.props}
          appData={this.context.appData}
          loading={this.context.loading}
        />
      )
    }
  }
)

export default withAppData
