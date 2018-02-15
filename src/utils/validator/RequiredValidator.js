import AbstractValidator from './AbstractValidator'

export default class RequiredValidator extends AbstractValidator {

  static defaults = {
    message: '',
  }

  /**
   * @param {string} value
   * @returns {bool}
   */
  validateValue(value) { // eslint-disable-line
    return !!value
  }
}
