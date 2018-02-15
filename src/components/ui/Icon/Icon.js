import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import injectSheet from '../../../utils/jss'

const styles = (theme) => ({
  default: {
    fontSize: 24,
    display: 'inline-block',
  },

  // Modifications
  inverse: {
    color: theme.icon.inverse,
  },
  standart: {
    color: theme.icon.default,
  },
  inherit: {
    fontSize: 'inherit',
  },
  small: {
    fontSize: 16,
  },
})

const Icon = ({
  className,
  classes,
  type,
  inverse,
  standart,
  small,
  inherit,
}) => (
  <i
    className={cn(
      classes.default,
      className,
      small && classes.small,
      inverse && classes.inverse,
      standart && classes.standart,
      inherit && classes.inherit,
      'icon',
      `icon__${type}`,
    )}
  />
)

Icon.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  inverse: PropTypes.bool,
  small: PropTypes.bool,
  standart: PropTypes.bool,
  inherit: PropTypes.bool,
}

Icon.defaultProps = {
  className: null,
  inverse: false,
  small: false,
  standart: false,
  inherit: false,
}

export default injectSheet(styles)(Icon)
