import React from 'react'
import {hydrate} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import 'whatwg-fetch'
import {jss, ThemeProvider, JssProvider} from './utils/jss'
import theme from './theme'
import App from './components/App'
import {AppDataProvider} from './containers/AppData'
import GraphQLProvider from './containers/GraphQLProvider'

/**
 * TODO: Move BrowserRouter from nested App component
 * and find problem why it doesn't work
 */
hydrate(
  <GraphQLProvider>
    <AppDataProvider>
      <ThemeProvider theme={theme}>
        <JssProvider jss={jss}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </JssProvider>
      </ThemeProvider>
    </AppDataProvider>
  </GraphQLProvider>,
  document.getElementById('app'),
)

const style = document.getElementById('critical-css')
style.parentNode.removeChild(style)
