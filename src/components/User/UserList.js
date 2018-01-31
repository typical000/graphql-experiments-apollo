import React, {Children} from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'
import Loader from '../ui/Loader'
import {ButtonPrimary} from '../ui/Button'

const styles = {
  list: {
    textAlign: 'center',
    minHeight: 200,
  },
  action: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    // marginBottom: 20,
    display: 'inline-block',
    textAlign: 'left',
    verticalAlign: 'top',
    width: 385,
    margin: [0, 10, 20],
  },
}

// TODO: Map all childrens and wrap
// them with item

const UserList = ({children, classes, loading, onLoadMoreClick}) => {
  const showAction = !loading && onLoadMoreClick

  return (
    <Loader transparent active={loading}>
      <div className={classes.list}>
        {Children.map(children, child => (
          <div className={classes.item}>{child}</div>
        ))}
      </div>
      {showAction && (
        <div className={classes.action}>
          <ButtonPrimary
            onClick={() => {
              onLoadMoreClick()
            }}
          >
            Load more
          </ButtonPrimary>
        </div>
      )}
    </Loader>
  )
}


UserList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node,
  loading: PropTypes.bool,
  onLoadMoreClick: PropTypes.func,
}

UserList.defaultProps = {
  loading: false,
  onLoadMoreClick: null,
}

export default injectSheet(styles)(UserList)
