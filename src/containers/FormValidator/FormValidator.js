import {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {validate} from '../../utils/validator'

/**
 * Form fields validator.
 * As rules recieves an object like this:
 *
 * {
 *     firstField: [
 *         new StringValidator({
 *             message: 'You provide wrong field',
 *             min: 5,
 *             max: 20
 *         })
 *     ],
 *     secondField: [
 *         new EmailValidator({
 *             message: 'Invalid email'
 *         }),
 *         new RequiredValidator({
 *             message: 'This field is required'
 *         })
 *     ]
 * }
 *
 * Example usage:
 *
 * import {RequiredValidator, getErrorByField} from '../../utils/validator'
 * import FormValidator from '../../containers/FormValidator'
 *
 * export default () => (
 *   <FormValidator
 *     data={{foo: 'bar'}}
 *     rules={{foo: [new RequiredValidator({message: 'Foo should not be empty'})]}}
 *   >
 *     {({success, errors, data}) => {
 *       if (errors) {
 *         return <div>{getErrorByField(errors, 'foo')}</div>
 *       }
 *       return <div>All OK</div>
 *     }}
 *   </FormValidator>
 * )
 *
 * Returns next params:
 * 1. 'success' - boolean
 * 2. 'error' - null or object of errors
 * 3. 'data' - original data
 */
class FormValidator extends PureComponent {

  static propTypes = {
    data: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])),
    rules: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    children: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      /**
       * Will be true if form is successfully validated
       * @type {boolean}
       */
      success: null,

      /**
       * Will be true if there are any validation error
       * @type {boolean}
       */
      errors: null,
    }

    if (!props.rules) {
      console.error('FormValidator: no rules specified. Usage of this component doesn\'t make sense.') // eslint-disable-line
    }
  }

  /**
   * Do all validation on props update
   */
  componentDidUpdate(prevProps) {
    const {data, rules} = this.props

    if (prevProps.data === data || !rules) {
      return
    }

    validate(data, rules)
      .then(() => this.setState({
        success: true,
        errors: null,
      }))
      .catch(errors => this.setState({
        success: false,
        errors,
      }))
  }

  render() {
    const {data} = this.props
    const {success, errors} = this.state

    return this.props.children({
      success,
      errors,
      data,
    })
  }
}

export default FormValidator
