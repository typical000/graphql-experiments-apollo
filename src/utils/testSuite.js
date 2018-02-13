import React from 'react'
import PropTypes from 'prop-types'
import {create as createJss} from 'jss'
import preset from 'jss-preset-default'
import {JssProvider, ThemeProvider} from 'react-jss'
import Enzyme, {
  render as enzymeRender,
  shallow as enzymeShallow,
  mount as enzymeMount
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import theme from '../theme'

// Setup enzyme adapter for current version of React
Enzyme.configure({
  adapter: new Adapter()
})

/**
 * Create testing jss instance
 * NOTE: For simplifying testing. Just return original classname
 */
const jss = createJss({
  createGenerateClassName: () => rule => rule.key,
  ...preset(),
})

/**
 * Create helper component on top of enzyme render
 * methods due to fact, that we are using JSS and it
 * can't work without initialized of "theme" and "jss"
 * providers in root from application.
 */
const WrappedWithJss = ({children}) => (
  <ThemeProvider theme={theme}>
    <JssProvider jss={jss}>
      {children}
    </JssProvider>
  </ThemeProvider>
)

WrappedWithJss.propTypes = {
  children: PropTypes.node.isRequired
}

export const shallow = children => enzymeShallow(
  <WrappedWithJss>{children}</WrappedWithJss>
)

export const render = children => enzymeRender(
  <WrappedWithJss>{children}</WrappedWithJss>
)

export const mount = children => enzymeMount(
  <WrappedWithJss>{children}</WrappedWithJss>
)
