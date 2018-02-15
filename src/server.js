import React from 'react'
import {renderToString} from 'react-dom/server'
import {stripIndents} from 'common-tags'
import {minify} from 'html-minifier'
import {JssProvider, ThemeProvider, SheetsRegistry, jss} from './utils/jss'
import theme from './theme'
import config from './config'
import chunks from '../dist/stats.json'
import App from './components/App'

// Get first part of name (all that goes before first '.')
const stripFileName = (name) => name.split('.')[0]

const renderChunks = () => {
  // Right order to place chunks.
  // Other chunks must be added in any order
  const order = ['manifest', 'vendor']

  return Object.values(chunks)
    .sort((a, b) => {
      const aIndex = order.indexOf(stripFileName(a))
      const bIndex = order.indexOf(stripFileName(b))

      if (aIndex === -1) return order.length
      if (aIndex < bIndex) return -1
      if (aIndex > bIndex) return 1
      return 0
    })
    .map((value) => `<script src="/${value}"></script>`)
    .join('')
}

const renderApp = () => {
  const sheets = new SheetsRegistry()
  // TODO: Sync server with client
  const app = renderToString(
    <ThemeProvider theme={theme}>
      <JssProvider registry={sheets} jss={jss}>
        <App />
      </JssProvider>
    </ThemeProvider>,
  )

  return {
    app,
    css: sheets.toString(),
  }
}

/**
 * Note: We don't render any html on serverside of real app.
 * Just a container for it.
 * If you want to render entire application, please add this line
 *
 * <div id="app">${app}</div>
 */
// eslint-disable-next-line
const renderHTML = ({app, css, js}) =>
  minify(
    stripIndents`
  <!doctype html>
  <html lang="en">
    <head>
      <title>${config.site.head.title}</title>
      <meta name="description" content="${config.site.head.description}" />
      <meta name="keywords" content="${config.site.head.keywords.join(' ')}" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="${config.site.og.title}" />
      <meta property="og:description" content="${config.site.og.description}" />
      <meta property="og:type" content="${config.site.og.type}" />
      <meta property="og:image" content="${config.site.og.image}" />
      <meta property="og:url" content="${config.site.og.url}" />
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <style id="critical-css" type="text/css">
        ${css}
      </style>
    </head>
    <body>
      <div id="app"></div>
      ${js}
    </body>
  </html>
`,
    {
      minifyCSS: true,
      minifyJS: true,
    },
  )

export default renderHTML({
  ...renderApp(),
  js: renderChunks(),
})
