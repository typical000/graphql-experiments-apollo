import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Actions from './Actions'
import Card from '../ui/Card'
import Avatar from '../Avatar'
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
}

class User extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
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

  render() {
    const {classes, id, screenname, avatar, gender, city, actions} = this.props

    return (
      <Card className={classes.user}>
        <div className={classes.avatar}>
          <Link to={`/user/${id}`}>
            <Avatar src={avatar} medium round />
          </Link>
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
          {actions && <Actions actions={actions} />}
        </div>
      </Card>
    )
  }
}

export default injectSheet(styles)(User)
