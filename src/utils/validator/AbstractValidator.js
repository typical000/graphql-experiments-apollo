export default class AbstractValidator {
  static defaults = {
    message: '',
  }

  constructor(options = {}) {
    this.options = Object.assign({}, this.defaults, options)
  }

  /**
   * @public
   * @param {Object} data
   * @returns {Promise}
   */
  validate(value) {
    return new Promise((resolve, reject) => {
      if (this.validateValue(value)) resolve()
      reject(this.options.message)
    })
  }

  /**
   * @abstract
   */
  // eslint-disable-next-line
  validateValue() {
    return true
  }
}
