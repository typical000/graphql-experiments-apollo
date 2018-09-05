import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'
import Avatar from '../Avatar'
import Card from '../ui/Card'
import {getUserReadableDate} from '../../utils/date'

const styles = (theme) => ({
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

const NewsfeedItem = ({children, classes, avatar, title, screenname, date}) => (
  <Card className={classes.item}>
    <div className={classes.avatar}>
      <Avatar small round src={avatar} />
    </div>
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>
          {screenname}
        </div>
        <div className={classes.date}>{getUserReadableDate(date)}</div>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  </Card>
)

NewsfeedItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  screenname: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default injectSheet(styles)(NewsfeedItem)
