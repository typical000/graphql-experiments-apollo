import React from 'react'
import PropTypes from 'prop-types'
import Card from '../ui/Card'
import {Button, ButtonPrimary} from '../ui/Button'
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
  actions: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  },
  action: {
    marginRight: 20,
  }
}

const User = ({classes, screenname, avatar, gender, city}) => (
  <Card className={classes.user}>
    <div className={classes.avatar}>
      <Avatar src={avatar} medium round />
    </div>
    <div className={classes.content}>
      <div className={classes.screenname}>{screenname}</div>
      <div>
        {gender && <div className={classes.inline}>{getGenderTranslation(gender)}</div>}
        {city && <div className={classes.inline}>from {city}</div>}
      </div>
      <div className={classes.actions}>
        <div className={classes.action}>
          <ButtonPrimary>Like</ButtonPrimary>
        </div>
        <div className={classes.action}>
          <Button>Add to friends</Button>
        </div>
      </div>
    </div>
  </Card>
)

User.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  avatar: PropTypes.string.isRequired,
  screenname: PropTypes.string.isRequired,
  gender: PropTypes.oneOf([1, 2]), // 1 - male, 2 - female
  city: PropTypes.string,
}

User.defaultProps = {
  gender: 0,
  city: null,
}

export default injectSheet(styles)(User)
