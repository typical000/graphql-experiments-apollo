/**
 * Base styles for making tippy work fine
 * TODO: If we need custom theme for tippy.css 
 * just overwrite tippy.css and include it as third-party component
 */
import 'react-tippy/dist/tippy.css'

import React from 'react'
import PropTypes from 'prop-types'
import {Tooltip as Tippy} from 'react-tippy'
import injectSheet from '../../../utils/jss'

const styles = (theme) => ({
  popover: {
    padding: [5, 7],
    font: {
      size: theme.typography.fontSize,
      lineHeight: theme.typography.lineHeight,
    }
  }
})

const Popover = ({classes, children, content, ...props}) => (
  <Tippy
    html={(
      <div className={classes.popover}>
        {content}
      </div>
    )}
    {...props}
    theme={'light'}
    interactive
  >
    {children}
  </Tippy>
)

Popover.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
  arrow: PropTypes.bool,
}

Popover.defaultProps = {
  position: 'top',
  arrow: true,
}

export default injectSheet(styles)(Popover)
