import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'
import Card from '../ui/Card'
import Loader from '../ui/Loader'
import {ButtonPrimary} from '../ui/Button'
import {Input, Textarea} from '../ui/Input'
import {H2, P} from '../typography'
import {getErrorByField} from '../../utils/validator'

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

class FeedbackForm extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    onSubmit: PropTypes.func.isRequired,
    sending: PropTypes.bool,
  }

  static defaultProps = {
    title: '',
    content: '',
    sending: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      title: props.title,
      content: props.content,
    }
  }

  componentWillReceiveProps(nextProps) {
    // In case if form was send - reset all fields
    if (this.props.sending && !nextProps.sending) {
      this.setState({
        title: '',
        content: '',
      })
    }
  }

  handleTitleInput(value) {
    this.setState({title: value})
  }

  handleContentInput(value) {
    this.setState({content: value})
  }

  handleSubmit() {
    const {title, content} = this.state

    this.props.onSubmit({
      title,
      content,
    })
  }

  render() {
    const {classes, sending, errors} = this.props
    const {title, content} = this.state

    return (
      <Loader active={sending}>
        <Card className={classes.container}>
          <H2>Leave your feedback</H2>
          <P>Your feedback is very important for us!</P>
          <div className={classes.row}>
            <Input
              label="Title"
              value={title}
              error={getErrorByField(errors, 'title')}
              onInput={(value) => {
                this.handleTitleInput(value)
              }}
            />
          </div>
          <div className={classes.row}>
            <Textarea
              label="Body"
              value={content}
              error={getErrorByField(errors, 'content')}
              onInput={(value) => {
                this.handleContentInput(value)
              }}
            />
          </div>
          <div className={classes.actions}>
            <ButtonPrimary
              onClick={() => {
                this.handleSubmit()
              }}
            >
              Send
            </ButtonPrimary>
          </div>
        </Card>
      </Loader>
    )
  }
}

export default injectSheet(styles)(FeedbackForm)
