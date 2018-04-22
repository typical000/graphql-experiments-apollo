// Base styles for making tippy work fine
import 'react-tippy/dist/tippy.css'

import React from 'react'
import PropTypes from 'prop-types'
import {Tooltip as Tippy} from 'react-tippy'
import injectSheet from '../../../utils/jss'

const styles = {
  tooltip: {
    fontSize: 12,
  }
}

const Tooltip = ({classes, children, content, ...props}) => (
  <Tippy
    html={(
      <div className={classes.tooltip}>
        {content}
      </div>
    )}
    {...props}
    theme={'dark'}
    interactive
  >
    {children}
  </Tippy>
)

Tooltip.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  arrow: PropTypes.bool,
}

Tooltip.defaultProps = {
  position: 'top',
  arrow: true,
}

export default injectSheet(styles)(Tooltip)
