import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import injectSheet from '../../utils/jss'

const styles = {
  paragraph: {
    margin: [0, 0, 30, 0],
    '&:last-child': {
      margin: 0,
    },
  },
}

const P = ({classes, className, children}) => (
  <p className={cn(classes.paragraph, className)}>
    {children}
  </p>
)

P.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
}

P.defaultProps = {
  className: ''
}

export default injectSheet(styles)(P)
