import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {translate, rotateZ} from 'css-functions'
import injectSheet from '../../../utils/jss'

const loaderStyles = theme => ({
  zIndex: 101,
  width: 60,
  height: 60,
  top: '50%',
  left: '50%',
  marginTop: -30,
  marginLeft: -30,
  border: [4, 'solid', theme.loader.background],
  borderTopColor: theme.loader.foreground,
  borderRadius: '50%',
  willChange: 'transform',
  animation: {
    name: 'spin',
    duration: 1000,
    iterationCount: 'infinite',
    timingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
})

const styles = theme => ({
  loader: {
    position: 'relative',
    borderRadius: 'inherit',
  },

  // Activate loader
  active: {
    '&::before, &::after': {
      position: 'absolute',
      content: '""',
    },
    '&::before': {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 100,
      opacity: 0.8,
      background: theme.common.card,
    },
    '&::after': {
      ...loaderStyles(theme),
    },
    '& $wrap': {
      display: 'block',
    },
  },

  // Elements
  wrap: {
    display: 'none',
    textAlign: 'center',
    position: 'absolute',
    zIndex: 110,
    top: '50%',
    left: '50%',
    transform: translate('-50%', '-50%'),
    willChange: 'transform',
  },

  text: {
    color: theme.text.default,
  },
  icon: {
    display: 'block',
    margin: [0, 'auto', 10],
    '&::after': {
      content: '""',
      display: 'block',
      position: 'static',
      ...loaderStyles(theme),
    },
  },

  // Modifications
  inverse: {
    '&::before': {
      background: theme.common.cardInverse,
    },
    '& $icon::after, &::after': {
      borderColor: theme.loader.inverseBackground,
      borderTopColor: theme.loader.inverseForeground,
    },
  },

  small: {
    '& $icon::after, &$active::after': {
      width: 30,
      height: 30,
      marginTop: -15,
      marginLeft: -15,
    },
  },

  bottom: {
    '&$active::after': {
      top: 'auto',
      bottom: 15,
    },
  },

  transparent: {
    '&::before': {
      display: 'none',
    },
  },

  // Main container loader
  main: {
    position: 'relative',
    '&$active': {
      position: 'static',
    },
    '&$active::before, &$active::after': {
      position: 'fixed',
    },
  },

  // Loader with text "Loading..."
  withText: {
    '&::after': {
      display: 'none',
    },
    '& $icon::after': {
      margin: [0, 'auto'],
    },
  },

  /* Loader animation */
  '@keyframes spin': {
    from: {
      transform: rotateZ(0),
    },
    to: {
      transform: rotateZ(360),
    },
  },
})

const Loader = ({children, classes, className, small, inverse, active, transparent, withText}) => {
  const classNames = cn(
    classes.loader,
    active && classes.active,
    small && classes.small,
    inverse && classes.inverse,
    withText && classes.withText,
    transparent && classes.transparent,
    className
  )

  if (withText) {
    return (
      <div className={classNames}>
        <span className={classes.wrap}>
          <span className={classes.icon} />
          <span className={classes.text}>
            Loading...
          </span>
        </span>
        {children}
      </div>
    )
  }

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}

Loader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
  small: PropTypes.bool,
  inverse: PropTypes.bool,
  withText: PropTypes.bool,
  transparent: PropTypes.bool,
}

Loader.defaultProps = {
  className: null,
  active: false,
  small: false,
  inverse: false,
  withText: false,
  transparent: false,
}

export default injectSheet(styles)(Loader)
