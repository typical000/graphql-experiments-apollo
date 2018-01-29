const base = {
  brand: '#fe504f',
  light: '#fff',
  dark: '#333'
}

export default {
  brand: base.brand, // Main brand color

  typography: {
    fontFamily: '"Gotham Pro", Helvetica, Arial, sans-serif',
    fontSize: 16,
    lineHeight: 1.65,
  },

  common: {
    page: '#222',
    card: '#252525',
    cardInverse: '#7f7f7f',
    border: '#515151',
  },

  text: {
    default: base.light,
    highlight: base.brand,
    muted: '#7f7f7f',
    inverse: base.dark,
  },

  background: {
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
}
