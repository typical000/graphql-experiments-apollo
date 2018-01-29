/**
 * Capitalize first letter
 * @param {string} text
 */
export const capitalizeFirstLetter = (text = '') => text.charAt(0).toUpperCase() + text.slice(1)

export default {
  capitalizeFirstLetter
}
