import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../../utils/jss'

const styles = {
  container: {
    maxWidth: 1000,
    width: '100%',
    padding: [0, 10],
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    boxSizing: 'border-box',
  },
}

const Container = ({children, classes}) => (
  <div className={classes.container}>
    {children}
  </div>
);


Container.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
}

export default injectSheet(styles)(Container)
