import {transitionDuration} from '../constants/animations'

/**
 * Border mixin
 * @param {string} border color
 */
export const border = (borderColor = '#000') => ({
  width: '1px', // jss-default-unit and jss-expand bug. Deep passing interprets 'width' as not a part of 'border' statement
  style: 'solid',
  color: borderColor,
})

/**
 * Transition mixin
 * @param {number} transition
 * @param {number} delay
 */
export const transition = (duration = `${transitionDuration}ms`, delay = '0ms') => ({
  property: 'all',
  timingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
  duration,
  delay,
})

export default {
  border,
  transition
}
