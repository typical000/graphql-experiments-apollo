import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'
import Card from '../ui/Card'

const styles = theme => ({
  item: {
    padding: [20, 40]
  },
  header: {
    display: 'flex',
    alignItem: 'center',
    marginBottom: 10,
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

const FeedbackItem = ({classes, title, screenname, date, content}) => (
  <Card className={classes.item}>
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
  </Card>
)

FeedbackItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  screenname: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default injectSheet(styles)(FeedbackItem)
