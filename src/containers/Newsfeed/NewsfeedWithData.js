import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Query, Mutation} from 'react-apollo'
import {Form, SortedByDateList as List} from '../../components/Newsfeed'
import Loader from '../../components/ui/Loader'

import LATEST_NEWSFEED_QUERY from '../../graphql/Newsfeed/queries/latestNewsfeed.graphql'
import NEWSFEED_MUTATION from '../../graphql/Newsfeed/mutations/newsfeed.graphql'
import {
  validate,
  StringValidator,
  RequiredValidator,
} from '../../utils/validator'

const LAST_ITEM_COUNT = 3

const PROXY_DATA = {
  query: LATEST_NEWSFEED_QUERY,
  variables: {limit: LAST_ITEM_COUNT},
}

const MIN_CONTENT_LENGTH = 10
const MAX_CONTENT_LENGTH = 500
const VALIDATION_RULES = {
  // title: [
  //   new RequiredValidator({
  //     message: 'Title should not be empty',
  //   }),
  // ],
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
 * Newsfeed page with form and rendered list of last entries.
 * Here we use HOC pattern for react-apollo
 */
export default class NewsfeedWithData extends PureComponent {
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
          update: (proxy, {data: {newsfeed}}) => {
            const data = proxy.readQuery(PROXY_DATA)

            data.latestNewsfeed.push(newsfeed)

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
      <Mutation mutation={NEWSFEED_MUTATION}>
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
      <Query query={LATEST_NEWSFEED_QUERY} variables={{limit: LAST_ITEM_COUNT}}>
        {({loading, data}) => (
          <Loader transparent active={loading}>
            {this.renderForm()}
            {data.latestNewsfeed && <List items={data.latestNewsfeed} />}
          </Loader>
        )}
      </Query>
    )
  }
}
