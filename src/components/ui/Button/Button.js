import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
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

  renderContent() {
    const {classes, icon, iconPosition, children} = this.props
    return (
      <span className={classes.wrap}>
        {icon && iconPosition === 'left' && this.renderIcon()}
        <span className={classes.text}>
          {children}
        </span>
        {icon && iconPosition === 'right' && this.renderIcon()}
      </span>
    )
  }

  render() {
    const {
      classes,
      className,
      inverse,
      disabled,
      tabIndex,
      type,
      onBlur,
      onFocus,
      onClick,
      small,
      big,
      loading,
      round,
      to,
    } = this.props

    const classNames = cn(
      classes.button,
      className,
      type && this.getClassesFromData(type),
      inverse && classes.inverse,
      disabled && classes.disabled,
      big && classes.big,
      small && classes.small,
      round && classes.round,
      loading && classes.loading
    )

    /**
     * In case if 'url' exists we render pure react-router link with button appearance.
     * See: LinkButton
     */

    const props = {className: classNames, tabIndex, onBlur, onFocus, onClick}
    if (to) props.to = to

    return React.createElement(
      to ? Link : 'button', props, this.renderContent()
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
  to: PropTypes.string,
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
  to: null,
  icon: null,
  iconPosition: 'left',
}

export default injectSheet(styles)(Button)
