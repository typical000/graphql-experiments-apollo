import {lighten, darken, transparentize} from 'polished'

const base = {
  brand: '#ff5959',
  light: '#fff',
  dark: '#000',
}

export default {
  brand: base.brand,

  success: '#69b32d',
  danger: '#f1462f',

  typography: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: 14,
    lineHeight: 1.2,
  },

  common: {
    page: darken(0.04, base.light),
    header: '#141414',
    border: darken(0.1, base.light),
    radius: 3,
    card: base.light,
    cardInverse: lighten(0.2, base.dark),
  },

  icon: {
    default: transparentize(0.5, base.dark),
    inverse: transparentize(0.1, base.light),
  },

  loader: {
    foreground: transparentize(0.4, base.dark),
    background: transparentize(0.8, base.dark),
    inverseForeground: transparentize(0.1, base.light),
    inverseBackground: transparentize(0.9, base.light),
  },

  text: {
    default: transparentize(0.15, base.dark),
    highlight: base.brand,
    muted: transparentize(0.5, base.dark),
    inverse: transparentize(0.1, base.light),
  },

  shadow: {
    level1: '0 0 2px 0 rgba(0,0,0,0.10), 0 2px 2px 0 rgba(0,0,0,0.20)',
    level2: '0 0 4px 0 rgba(0,0,0,0.10), 0 4px 4px 0 rgba(0,0,0,0.20)',
    level3: '0 0 8px 0 rgba(0,0,0,0.10), 0 8px 8px 0 rgba(0,0,0,0.20)',
    level4: '0 0 16px 0 rgba(0,0,0,0.10), 0 16px 16px 0 rgba(0,0,0,0.20)',
    level5: '0 0 24px 0 rgba(0,0,0,0.10), 0 24px 24px 0 rgba(0,0,0,0.20)',
  },

  button: {
    default: {
      color: transparentize(0.3, base.dark),
      background: darken(0.08, base.light),
      hoverBackground: darken(0.12, base.light),
      icon: transparentize(0.5, base.dark),
    },
    inverse: {
      color: transparentize(0.1, base.light),
      background: lighten(0.25, base.dark),
      hoverBackground: lighten(0.3, base.dark),
      icon: transparentize(0.1, base.light),
    },
    primary: {
      color: transparentize(0.1, base.light),
      background: base.brand,
      hoverBackground: darken(0.04, base.brand),
      icon: transparentize(0.1, base.light),
    },
  },

  input: {
    label: transparentize(0.5, base.dark),
    border: transparentize(0.85, base.dark),
  },
}
