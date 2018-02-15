import {create as createJss} from 'jss'
import injectSheet, {
  JssProvider,
  SheetsRegistry,
  ThemeProvider,
} from 'react-jss'
import preset from 'jss-preset-default'

const jss = createJss(preset())

export {JssProvider, SheetsRegistry, ThemeProvider, jss}

export default injectSheet
