import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import injectSheet from '../../utils/jss'

const styles = theme => ({
  avatar: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    borderRadius: theme.common.radius,
    background: theme.common.border // TODO: Replace with cardMuted
  },
  img: {
    width: '100%',
    height: 'auto',
    display: 'inline-block',
    verticalAlign: 'middle',
  },

  // Sizes
  small: {
    width: 40,
    height: 40,
  },
  medium: {
    width: 100,
    height: 100,
  },
  large: {
    width: 240,
    height: 240,
  },

  // Other modifications
  round: {
    overflow: 'hidden',
    borderRadius: 1000,
  },
})

const Avatar = ({classes, src, small, medium, large, round}) => (
  <div
    className={cn(
      classes.avatar,
      round && classes.round,
      small && classes.small,
      medium && classes.medium,
      large && classes.large,
    )}
  >
    <img
      className={classes.img}
      src={src}
      role="presentation"
    />
  </div>
)

Avatar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  src: PropTypes.string.isRequired,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  round: PropTypes.bool,
}

Avatar.defaultProps = {
  small: false,
  medium: false,
  large: false,
  roung: false,
}

export default injectSheet(styles)(Avatar)
