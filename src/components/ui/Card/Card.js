import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import injectSheet from '../../../utils/jss'

const styles = theme => ({
  card: {
    color: theme.text.default,
    borderRadius: theme.common.radius,
    background: theme.common.card,
    boxShadow: theme.shadow.level1,
  },
  inverse: {
    composes: '$card',
    color: theme.text.inverse,
    background: theme.common.cardInverse,
  },
})

const Card = ({children, classes, className, inverse}) => (
  <div className={cn(inverse ? classes.inverse : classes.card, className)}>
    {children}
  </div>
)

Card.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  inverse: PropTypes.bool,
}

Card.defaultProps = {
  className: '',
  inverse: false,
}

export default injectSheet(styles)(Card)
