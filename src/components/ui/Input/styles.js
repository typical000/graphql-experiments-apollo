import {translateY} from 'css-functions'
import {transition} from '../../../utils/css'
import {TRANSITION_DURATION} from '../../../constants/animations.js'

export default (theme) => ({
  default: {
    position: 'relative',
    textAlign: 'left', // All content inside must be left aligned, everywhere
  },
  font: {
    boxSizing: 'border-box',
    font: {
      size: theme.typography.fontSize,
      lineHeight: '20px',
      family: theme.typography.fontFamily,
    },
  },
  label: {
    composes: '$font',
    color: theme.input.label,
  },
  value: {
    // Real input
    composes: '$font',
    width: '100%',
    minHeight: 40,
    padding: [10, 0],
    appearance: 'none',
    color: theme.text.default,
    border: 0,
    borderRadius: 0,
    background: 'none',
    boxShadow: 'none',
    flexGrow: 1,
    transition: transition(),
    outline: 0,
    resize: 'none',
    '&::placeholder': {
      color: theme.text.muted,
      // To fix dirty overflowed placeholders in textarea
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '&:focus::placeholder': {
      // Remove placeholder on focus
      color: 'transparent',
    },
    '&:disabled': {
      pointerEvents: 'none',
      cursor: 'default',
    },
  },

  additionalText: {
    display: 'block',
    overflow: 'hidden',
    maxHeight: 45, // We suppose, that in input will be only 2 rows and no more
    marginTop: 2,
    willChange: 'transform',
    font: {
      size: '12px',
      lineHeight: '15px',
    },
  },

  description: {
    composes: '$additionalText',
    transform: translateY(0),
    transition: transition(TRANSITION_DURATION, TRANSITION_DURATION),
    color: theme.text.muted,
  },

  errorText: {
    composes: '$additionalText',
    visibility: 'hidden',
    maxMeight: 0,
    marginTop: 3, // As on BB - bigger spacing
    transform: translateY(20),
    opacity: 0,
    transition: transition(TRANSITION_DURATION),
    color: theme.danger,
  },

  descriptionLong: {
    composes: '$description',
    maxHeight: 90,
  },

  errorTextLong: {
    composes: ['$errorText', '$descriptionLong'],
  },

  // Prefix and sufix for phone codes etc
  prefix: {
    padding: [10, 0],
    lineHeight: 20,
    marginRight: 10,
  },

  sufix: {
    padding: [10, 0],
    lineHeight: 20,
    marginLeft: 10,
  },

  container: {
    display: 'flex',
    position: 'relative',
    borderBottom: [1, 'solid', theme.input.border],
    alignItems: 'center',
    '&::before': {
      display: 'block',
      position: 'absolute',
      right: '50%',
      bottom: -1, // Need to hide border-bottom
      left: '50%',
      height: 2,
      content: '""',
      background: theme.brand,
      transition: transition(),
    },
  },

  icon: {
    color: theme.icon.default,
    transition: transition(),
    padding: 0,
    paddingLeft: 10,
    userSelect: 'none',
    appearance: 'none',
    border: 'none',
    borderRadius: 0,
    outline: 'none',
    background: 'transparent',
    boxShadow: 'none',
    flexShrink: 0,
    '&:hover': {
      opacity: 0.5,
    },
    '&:first-child': {
      paddingRight: 10,
      paddingLeft: 0,
    },
  },

  /* Global states */
  focused: {
    '& $container::before': {
      right: 0,
      left: 0,
      background: theme.brand,
    },
  },

  error: {
    '& $description': {
      visibility: 'hidden',
      maxHeight: 0,
      transform: translateY(20),
      opacity: 0,
      transition: transition(TRANSITION_DURATION),
    },
    '& $errorText': {
      transition: transition(TRANSITION_DURATION, TRANSITION_DURATION),
      visibility: 'visible',
      maxHeight: 45,
      transform: translateY(0),
      opacity: 1,
    },
    '& $errorTextLong': {
      maxHeight: 90,
    },
    '& $container::before': {
      right: 0,
      left: 0,
      background: theme.danger,
    },
  },

  // Disabled state
  disabled: {
    pointerEvents: 'none',
    opacity: 0.5,
  },

  // Modifications

  // Clickable input
  clickable: {
    cursor: 'pointer',
  },

  // Input, without borders
  noBorder: {
    composes: '$default',
    '& $container': {
      border: 'none',
    },
    '& $container::before': {
      display: 'none',
    },
  },
})
