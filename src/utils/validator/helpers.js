/**
 * Extracts possible error from error object
 * @param {Object} errors
 * @param {string} field
 * @returns {null|string}
 */
export const getErrorByField = (errors, field) => errors && errors[field] && errors[field][0]

export default {
  getErrorByField
}
