import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import injectSheet from '../../../utils/jss'
import styles from './styles'

class Input extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      focused: false,
      value: props.value,
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleInput() {
    const value = (this.input.textarea && this.input.textarea.value) || this.input.value
    this.setState({value})
    this.props.onInput(value)
  }

  handleFocus() {
    this.setState({focused: true})
    this.props.onFocus()
  }

  handleBlur() {
    this.setState({focused: false})
    this.props.onBlur()
  }

  render() {
    const {
      classes,
      children,
      className,
      inverse,
      disabled,
      name,
      placeholder,
      label,
      description,
      error,
    } = this.props
    const {focused, value} = this.state

    const classNames = cn(
      classes.default,
      error && classes.error,
      disabled && classes.disabled,
      focused && classes.focused,
      inverse && classes.inverse,
      className
    )

    return (
      <div className={classNames}>
        {label && <div className={classes.label}>{label}</div>}
        <div className={classes.container}>
          {React.Children.map(children, child => React.cloneElement(child, {
            className: classes.value,
            name,
            value,
            placeholder,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onInput: this.handleInput,
            ref: (input) => {
              this.input = input
            }
          }))}
        </div>
        {error && <div className={classes.errorText}>{error}</div>}
        {description && <div className={classes.description}>{description}</div>}
      </div>
    )
  }
}

Input.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.string,
  inverse: PropTypes.bool,
  onInput: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

Input.defaultProps = {
  className: null,
  disabled: false,
  name: null,
  value: '',
  placeholder: null,
  label: null,
  description: null,
  error: null,
  inverse: false,
  onInput: () => {},
  onFocus: () => {},
  onBlur: () => {},
}

export default injectSheet(styles)(Input)
