import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {graphql, compose} from 'react-apollo'
import {Form, Item} from '../../components/Newsfeed'
import Loader from '../../components/ui/Loader'
import Row from '../../components/ui/Row'
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
 * Newsfeed page with form and rendered list of last entries.
 * Here we use HOC pattern for react-apollo
 */
class NewsfeedWithData extends PureComponent {
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

  submitData({title, content}) {
    this.setState({
      sending: true,
      errors: null, // Clear any possible error
    })

    this.props
      .mutate({
        mutation: NEWSFEED_MUTATION,
        variables: {title, content},
        update: (proxy, {data: {newsfeed}}) => {
          const data = proxy.readQuery(PROXY_DATA)

          data.latestNewsfeed.push(newsfeed)

          proxy.writeQuery({
            data,
            ...PROXY_DATA,
          })
        },
      })
      .then(() => {
        // After sendung data to server
        this.setState({sending: false})
      })
  }

  handleSubmit({title, content}) {
    validate({title, content}, VALIDATION_RULES)
      .then((data) => this.submitData(data))
      .catch((errors) => this.setState({errors}))
  }

  renderLastEntries() {
    const {data: {latestNewsfeed}} = this.props
    // Create new array due to fatal error when calling 'sort':
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Read-only
    const data = latestNewsfeed ? [...latestNewsfeed] : []

    // Sort by date, to make new written entries goes first
    return (
      data
        .sort((prev, next) => prev.date < next.date)
        // "Row" components was added to take care about leaving
        // our components indipendent from their rendering context.
        .map(({id, title, date, content, user}) => (
          <Row key={id}>
            <Item
              title={title}
              date={date}
              screenname={user.screenname}
              avatar={user.avatar}
            >
              {content}
            </Item>
          </Row>
        ))
    )
  }

  render() {
    const {errors, sending} = this.state

    return (
      <Loader transparent active={this.props.data.loading}>
        <Form onSubmit={this.handleSubmit} sending={sending} errors={errors} />
        {this.renderLastEntries()}
      </Loader>
    )
  }
}

/**
 * Strange composition of query and mutation
 * What wil happen when we need to make 2 different mutations and compose them together?
 */
export default compose(
  graphql(LATEST_NEWSFEED_QUERY, {
    options: {variables: {limit: LAST_ITEM_COUNT}},
  }),
  graphql(NEWSFEED_MUTATION),
)(NewsfeedWithData)
