import {isNumber, isString} from 'lodash'
import AbstractValidator from './AbstractValidator'

export default class StringValidator extends AbstractValidator {

  static defaults = {
    message: '',

    /**
     * Specifies the exact length limit of the value to be validated
     * @type {number}
     */
    length: null,

    /**
     * Specifies the minimum length of the value to be validated
     * @type {number}
     */
    min: null,

    /**
     * Specifies the maximum length limit of the value to be validated
     * @type {number}
     */
    max: null,
  }

  /**
   * @param {string} value
   * @returns {bool}
   */
  validateValue(value) {
    return this.checkString(value) &&
           this.checkLength(value) &&
           this.checkMax(value) &&
           this.checkMin(value)
  }

  checkString(value) { // eslint-disable-line
    return isString(value)
  }

  checkLength(value) {
    if (isNumber(this.options.length)) {
      return value.length === this.options.length
    }

    return true
  }

  checkMax(value) {
    if (isNumber(this.options.max)) {
      return value.length <= this.options.max
    }

    return true
  }

  checkMin(value) {
    if (isNumber(this.options.min)) {
      return value.length >= this.options.min
    }

    return true
  }
}
