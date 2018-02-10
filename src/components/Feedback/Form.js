import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'
import Card from '../ui/Card'
import {ButtonPrimary} from '../ui/Button'
import {Input, Textarea} from '../ui/Input'
import {H2, P} from '../typography'

const styles = {
  container: {
    padding: 40,
    marignBottom: 20,
  },
  row: {
    marginBottom: 20,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
}

const FeedbackForm = ({classes}) => (
  <Card className={classes.container}>
    <H2>Leave your feedback</H2>
    <P>Your feedback is very important for us!</P>
    <div className={classes.row}>
      {/* TODO: Add handlers */}
      <Input label="Title" />
    </div>
    <div className={classes.row}>
      {/* TODO: Add handlers */}
      <Textarea label="Body" />
    </div>
    <div className={classes.actions}>
      {/* TODO: Add onClick */}
      <ButtonPrimary>Send</ButtonPrimary>
    </div>
  </Card>
)

FeedbackForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default injectSheet(styles)(FeedbackForm)
