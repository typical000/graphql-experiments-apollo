import React from 'react'
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
 * IMPORTANT: Find a solution to not pass theme provider
 * inside testing suites. Because any change of theme WILL break
 * all snapshots
 */
const renderComponentWithJss = children => (
  <ThemeProvider theme={theme}>
    <JssProvider jss={jss}>
      {children}
    </JssProvider>
  </ThemeProvider>
)

export const shallow = children => enzymeShallow(renderComponentWithJss(children))
export const render = children => enzymeRender(renderComponentWithJss(children))
export const mount = children => enzymeMount(renderComponentWithJss(children))
