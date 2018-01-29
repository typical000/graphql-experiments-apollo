import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import injectSheet from '../../utils/jss'

const styles = theme => ({
  heading: {
    fontSize: 24,
    lineHeight: 1.4,
    fontWeight: 'bold',
    margin: [0, 0, 20, 0],
    letterSpacing: 3,
    textTransform: 'none',
    color: theme.text.default
  },
  light: {
    color: theme.text.muted
  }
})

const H3 = ({classes, className, children, light}) => {
  const headingClasses = cn(
    classes.heading,
    className,
    light && classes.light
  )

  return (
    <h3 className={headingClasses}>
      {children}
    </h3>
  )
}

H3.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  light: PropTypes.bool,
}

H3.defaultProps = {
  className: '',
  light: false,
}

export default injectSheet(styles)(H3)
