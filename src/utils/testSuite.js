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

export const shallowWithJss = children => enzymeShallow(
  <WrappedWithJss>{children}</WrappedWithJss>
)

export const renderWithJss = children => enzymeRender(
  <WrappedWithJss>{children}</WrappedWithJss>
)

export const mountWithJss = children => enzymeMount(
  <WrappedWithJss>{children}</WrappedWithJss>
)

/**
 * Helper method for 'with JSS' render methods above.
 * Extracts from deep nested tree needed component.
 *
 * All this nesting is (from above down to component):
 * 1. ThemeProvider
 * 2. JssProvider
 * 3. Jss
 * 4. Our needed component
 */

export const extractFromJssWrapper = wrap => wrap.children().children().children().children()

/**
 * Proxy methods to give access to enzyme render methods from
 * one place. Also, they are created to avoid initalizing
 * in all test files enzyme adapters
 */

export const shallow = children => enzymeShallow(children)

export const render = children => enzymeRender(children)

export const mount = children => enzymeMount(children)
