import AbstractValidator from './AbstractValidator'

export default class RequiredValidator extends AbstractValidator {
  static defaults = {
    message: '',
  }

  /**
   * @param {string} value
   * @returns {bool}
   */
  // eslint-disable-next-line
  validateValue(value) {
    return !!value
  }
}
