import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'
import Avatar from '../Avatar'
import Card from '../ui/Card'

const styles = theme => ({
  item: {
    padding: [20, 40],
    display: 'flex',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    flexGrow: 1,
  },
  avatar: {
    marginRight: 10,
    flexShrink: 0,
  },
  title: {
    fontWeight: 'bold',
  },
  user: {
    fontWeight: 'normal',
    paddingLeft: 5,
  },
  date: {
    fontSize: 12,
    marginLeft: 'auto',
    color: theme.text.muted,
  },
  content: {
    marginTop: 10,
  },
})

const FeedbackItem = ({classes, avatar, title, screenname, date, content}) => (
  <Card className={classes.item}>
    <div className={classes.avatar}>
      <Avatar small round src={avatar} />
    </div>
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>
          {title}
          <span className={classes.user}>
            by {screenname}
          </span>
        </div>
        <div className={classes.date}>
          {date}
        </div>
      </div>
      <div className={classes.content}>
        {content}
      </div>
    </div>
  </Card>
)

FeedbackItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  screenname: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default injectSheet(styles)(FeedbackItem)
