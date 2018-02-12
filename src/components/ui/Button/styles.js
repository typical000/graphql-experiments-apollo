import {transition} from '../../../utils/css'

export default theme => ({
  button: {
    display: 'flex',
    position: 'relative',
    padding: [10, 15],
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    fontWeight: 'bold',
    lineHeight: '20px',
    cursor: 'pointer',
    userSelect: 'none',
    appearance: 'none',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: theme.button.default.color,
    border: 'none',
    borderRadius: theme.common.radius,
    outline: 'none',
    background: theme.button.default.background,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: theme.shadow.level1,
    transition: transition(),
    '&:hover, &:active, &:focus': {
      background: theme.button.default.hoverBackground,
    }
  },

  // Elements
  relative: {
    position: 'relative',
    zIndex: 2,
  },
  icon: {
    composes: '$relative',
    fontSize: 24, // Default size from brandbook
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.button.default.icon,
    paddingRight: 7,
    flexShrink: 0,
    margin: [-1, 0], // Fixes for design purposes
    '&:last-child': {
      paddingRight: 0,
      paddingLeft: 7,
    },
  },
  text: {
    composes: '$relative',
    textAlign: 'center',
  },

  /**
   * Tag (counter) inside button
   * Used on activity button with counters
   */
  tag: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0,
  },

  /**
   * Inner wrapper item.
   * Needed for correct displaying in FF browser for 'button' tag
   */
  wrap: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Disabled state
  disabled: {
    pointerEvents: 'none',
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  // Inverse default button
  inverse: {
    composes: '$button',
    background: theme.button.inverse.background,
    color: theme.button.inverse.color,
    '&:hover, &:active, &:focus': {
      background: theme.button.inverse.hoverBackground,
    },
    '& $icon': {
      color: theme.button.inverse.icon,
    }
  },

  // Primary button
  primary: {
    composes: '$button',
    color: theme.button.primary.color,
    background: theme.button.primary.background,
    '&:hover, &:active, &:focus': {
      background: theme.button.primary.hoverBackground,
    },
    '& $icon': {
      color: theme.button.primary.icon,
    },
  },

  /* Rounded button */
  round: {
    composes: '$button',
    width: 40,
    height: 40,
    padding: 0,
    borderRadius: '50%',
    '& $icon': {
      padding: 0,
      // Need to make icon on center on MAC Safari devices
      display: 'block',
      width: 40,
      height: 40,
      lineHeight: 40,
      textAlign: 'center',
      '&:first-child, &:last-child': {
        padding: 0,
      },
    },
  },

  // Special modifications
  textLeft: {
    composes: '$button',
    justifyContent: 'flex-start',
  },
  '$textLeft $text': {
    textAlign: 'left',
  },
  '$textLeft $wrap': {
    justifyContent: 'flex-start',
  },

  inline: {
    display: 'inline-flex',
  },

  /**
   * For buttons, that must be NOT BIGGER than stadart BB button
   * WARNING: Don't use with size modifications
   */
  fixedHeight: {
    height: 40,
    padding: [2, 10],
    lineHeight: 'normal',
    '& $text': {
      overflow: 'hidden', // Needed to hide overflowing text from button
      maxHeight: 40,
    }
  },

  // Loading state for button
  loading: {
    opacity: 0.5,
    filter: 'grayscale(100%)',
    pointerEvents: 'none',
  },
})
