import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'

const styles = theme => ({
  header: {
    position: 'fixed',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    background: theme.common.header,
    color: theme.text.inverse,
    boxShadow: theme.shadow.level2,
    boxSizing: 'border-box',
    height: 60,
    padding: [10, 20],
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
})

const Header = ({children, classes}) => (
  <div className={classes.header}>
    {children}
  </div>
)


Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
}

export default injectSheet(styles)(Header)
