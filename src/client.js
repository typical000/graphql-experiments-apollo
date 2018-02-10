import React from 'react'
import {hydrate} from 'react-dom'
import 'whatwg-fetch'
import {jss, ThemeProvider, JssProvider} from './utils/jss'
import theme from './theme'
import App from './components/App'
import GraphQLProvider from './containers/GraphQLProvider'

/**
 * TODO: Move BrowserRouter from nested App component
 * and find problem why it doesn't work
 */
hydrate(
  <GraphQLProvider>
    <ThemeProvider theme={theme}>
      <JssProvider jss={jss}>
        <App />
      </JssProvider>
    </ThemeProvider>
  </GraphQLProvider>,
  document.getElementById('app')
)

const style = document.getElementById('critical-css')
style.parentNode.removeChild(style)
