/**
 * Convert unix time to something more readable
 * @param {number} timestamp
 */
export const getUserReadableDate = timestamp => (new Date(timestamp)).toDateString()

export default {
  getUserReadableDate
}
