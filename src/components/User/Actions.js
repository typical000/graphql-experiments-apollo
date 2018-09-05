import React from 'react'
import PropTypes from 'prop-types'
import {LikeButton, FavoriteButton} from '../../containers/Activity'
import injectSheet from '../../utils/jss'

const styles = {
  actions: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  },
  action: {
    marginRight: 10,
    '&:last-child': {
      marginRight: 0,
    },
  },
}

const Actions = ({classes, actions}) => (
  <div className={classes.actions}>
    {actions.like &&
      actions.like.available && (
        <div className={classes.action}>
          <LikeButton active={actions.like.active} userId={actions.id}>
            Like
          </LikeButton>
        </div>
      )}
    {actions.favorite &&
      actions.favorite.available && (
        <div className={classes.action}>
          <FavoriteButton active={actions.favorite.active} userId={actions.id}>
            Add to friends
          </FavoriteButton>
        </div>
      )}
  </div>
)

Actions.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  actions: PropTypes.shape({
    like: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
    ),
    favorite: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
    ),
  }).isRequired,
}

export default injectSheet(styles)(Actions)
