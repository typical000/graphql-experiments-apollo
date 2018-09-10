import React from 'react'
import PropTypes from 'prop-types'
import Loader from '../ui/Loader'
import injectSheet from '../../utils/jss'

const styles = {
  wrap: {
    position: 'relative',
  },
  stretcher: {
    height: 100,
  },
}

const LoadingMore = ({classes}) => (
  <div className={classes.wrap}>
    <Loader transparent active>
      <div className={classes.stretcher} />
    </Loader>
  </div>
)

LoadingMore.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default injectSheet(styles)(LoadingMore)