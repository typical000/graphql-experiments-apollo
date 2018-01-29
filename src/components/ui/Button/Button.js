import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.js'
import Icon from '../Icon'
import injectSheet from '../../../utils/jss'

class Button extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.disabled !== nextProps.disabled) return true
    return false
  }

  getClassesFromData(type) {
    const {classes} = this.props
    if (typeof type === 'string') return classes[type]
    return type.map(item => ({[classes[item]]: true}))
  }

  renderIcon() {
    return (
      <span className={this.props.classes.icon}>
        <Icon type={this.props.type} />
      </span>
    )
  }

  render() {
    const {
      children,
      classes,
      className,
      inverse,
      disabled,
      tabIndex,
      type,
      icon,
      iconPosition,
      onBlur,
      onFocus,
      onClick,
      small,
      big,
      loading,
      round,
    } = this.props

    const classNames = cn(
      classes.default,
      className,
      type && this.getClassesFromData(type),
      inverse && classes.inverse,
      disabled && classes.disabled,
      big && classes.big,
      small && classes.small,
      round && classes.round,
      loading && classes.loading
    )

    return (
      <button
        className={classNames}
        tabIndex={tabIndex}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={onClick}
      >
        <span className={classes.wrap}>
          {icon && iconPosition === 'left' && this.renderIcon()}
          <span className={classes.text}>
            {children}
          </span>
          {icon && iconPosition === 'right' && this.renderIcon()}
        </span>
      </button>
    )
  }
}

Button.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  inverse: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  round: PropTypes.bool,
  big: PropTypes.bool,
  small: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
}

Button.defaultProps = {
  className: null,
  tabIndex: null,
  inverse: false,
  disabled: false,
  loading: false,
  round: false,
  big: false,
  small: false,
  onBlur: () => {},
  onFocus: () => {},
  onClick: () => {},
  type: null,
  icon: null,
  iconPosition: 'left',
}

export default injectSheet(styles)(Button)
