import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Card from '../ui/Card'
import Avatar from '../Avatar'
import {LikeButton, FavoriteButton} from '../../containers/Activity'
import injectSheet from '../../utils/jss'

/**
 * @param {number} gender
 */
const getGenderTranslation = (gender) => {
  if (gender === 1) return 'Male'
  return 'Female'
}

const styles = {
  user: {
    padding: 20,
    display: 'flex',
    alignItems: 'flex-start',
  },
  avatar: {
    flexShrink: 1,
    flexGrow: 0,
    marginRight: 20,
  },
  content: {
    flexGrow: 1,
  },
  row: {
    marginBottom: 10,
  },
  screenname: {
    composes: '$row',
    fontWeight: 'bold',
  },
  inline: {
    display: 'inline-block',
    verticalAlign: 'middle',
    '&::before': {
      content: '","',
      display: 'inline',
      paddingRight: 5,
    },
    '&:first-child::before': {
      display: 'none',
    },
  },
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

class User extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    avatar: PropTypes.string.isRequired,
    screenname: PropTypes.string.isRequired,
    gender: PropTypes.oneOf([1, 2]), // 1 - male, 2 - female
    city: PropTypes.string,
    actions: PropTypes.shape({
      like: PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.number,
          PropTypes.string,
        ]),
      ),
      favorite: PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.number,
          PropTypes.string,
        ]),
      ),
    }),
  }

  static defaultProps = {
    gender: 0,
    city: null,
    actions: null,
  }

  renderLikeAction() {
    const {classes, actions} = this.props
    return (
      <div className={classes.action}>
        <LikeButton active={actions.like.active} userId={actions.id}>
          Like
        </LikeButton>
      </div>
    )
  }

  renderFavoriteAction() {
    const {classes, actions} = this.props
    return (
      <div className={classes.action}>
        <FavoriteButton active={actions.favorite.active} userId={actions.id}>
          Add to friends
        </FavoriteButton>
      </div>
    )
  }

  render() {
    const {classes, screenname, avatar, gender, city, actions} = this.props

    return (
      <Card className={classes.user}>
        <div className={classes.avatar}>
          <Avatar src={avatar} medium round />
        </div>
        <div className={classes.content}>
          <div className={classes.screenname}>{screenname}</div>
          <div>
            {gender && (
              <div className={classes.inline}>
                {getGenderTranslation(gender)}
              </div>
            )}
            {city && <div className={classes.inline}>from {city}</div>}
          </div>
          {actions && (
            <div className={classes.actions}>
              {actions.like &&
                actions.like.available &&
                this.renderLikeAction()}
              {actions.favorite &&
                actions.favorite.available &&
                this.renderFavoriteAction()}
            </div>
          )}
        </div>
      </Card>
    )
  }
}

export default injectSheet(styles)(User)
