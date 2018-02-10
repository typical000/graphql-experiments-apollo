import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'
import Form from './Form'
import Item from './Item'

const styles = {
  item: {
    marginTop: 20,
  }
}

const Feedback = ({classes}) => (
  <div className={classes.feedback}>
    <Form />
    {/* TODO: Add MAP for items */}
    <div className={classes.item}>
      <Item
        title={'Some title'}
        screenname={'%username%'}
        date={'11.11.11'}
        content={'Wow, it was amazing!!!'}
      />
    </div>
  </div>
)

Feedback.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default injectSheet(styles)(Feedback)
