import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Query, Mutation} from 'react-apollo'
import {Form, SortedByDateList as List} from '../../components/Feedback'
import Loader from '../../components/ui/Loader'

import LATEST_FEEDBACK_QUERY from '../../graphql/Feedback/queries/latestFeedback.graphql'
import FEEDBACK_MUTATION from '../../graphql/Feedback/mutations/feedback.graphql'
import {
  validate,
  StringValidator,
  RequiredValidator,
} from '../../utils/validator'

const LAST_ITEM_COUNT = 3

const PROXY_DATA = {
  query: LATEST_FEEDBACK_QUERY,
  variables: {limit: LAST_ITEM_COUNT},
}

const MIN_CONTENT_LENGTH = 10
const MAX_CONTENT_LENGTH = 500
const VALIDATION_RULES = {
  title: [
    new RequiredValidator({
      message: 'Title should not be empty',
    }),
  ],
  content: [
    new RequiredValidator({
      message: 'Message should not be empty',
    }),
    new StringValidator({
      message: `Message must be at least ${MIN_CONTENT_LENGTH} and not more than ${MAX_CONTENT_LENGTH} characters`,
      min: MIN_CONTENT_LENGTH,
      max: MAX_CONTENT_LENGTH,
    }),
  ],
}

/**
 * Feedback page with form and rendered list of last entries.
 * Here we use HOC pattern for react-apollo
 */
export default class FeedbackWithData extends PureComponent {
  static propTypes = {
    data: PropTypes.object, // eslint-disable-line
    mutate: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      sending: false,
      errors: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
   * @param {Object} data
   * @param {string} data.title
   * @param {string} data.content
   * @param {function} mutate
   */
  handleSubmit({title, content}, mutate) {
    validate({title, content}, VALIDATION_RULES)
      .then((validatedData) => {
        this.setState({
          sending: true,
          errors: null, // Clear any possible error
        })

        mutate({
          variables: validatedData,
          update: (proxy, {data: {feedback}}) => {
            const data = proxy.readQuery(PROXY_DATA)

            data.latestFeedback.push(feedback)

            proxy.writeQuery({
              data,
              ...PROXY_DATA,
            })
          },
        }).then(() => {
          // After sending data to server
          this.setState({sending: false})
        })
      })
      .catch((errors) => this.setState({errors}))
  }

  renderForm() {
    const {errors, sending} = this.state

    return (
      <Mutation mutation={FEEDBACK_MUTATION}>
        {(submitMutation) => (
          <Form
            onSubmit={(data) => this.handleSubmit(data, submitMutation)}
            sending={sending}
            errors={errors}
          />
        )}
      </Mutation>
    )
  }

  render() {
    return (
      <Query query={LATEST_FEEDBACK_QUERY} variables={{limit: LAST_ITEM_COUNT}}>
        {({loading, data}) => (
          <Loader transparent active={loading}>
            {this.renderForm()}
            {data.latestFeedback && <List items={data.latestFeedback} />}
          </Loader>
        )}
      </Query>
    )
  }
}
