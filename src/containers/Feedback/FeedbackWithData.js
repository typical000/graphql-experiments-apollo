import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {graphql, compose} from 'react-apollo'
import {Form, Item} from '../../components/Feedback'
import Loader from '../../components/ui/Loader'
import LATEST_FEEDBACK_QUERY from '../../graphql/Feedback/queries/latestFeedback.graphql'
import FEEDBACK_MUTATION from '../../graphql/Feedback/mutations/feedback.graphql'

const LAST_ITEM_COUNT = 3

// Move to variable identical code
const PROXY_DATA = {
  query: LATEST_FEEDBACK_QUERY,
  variables: {limit: LAST_ITEM_COUNT},
}

/**
 * Feedback page with form and rendered list of last entries.
 * Here we use HOC pattern for react-apollo
 */
class FeedbackWithData extends PureComponent {
  static propTypes = {
    data: PropTypes.object, // eslint-disable-line
    mutate: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      sending: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit({title, content}) {
    this.setState({sending: true})

    this.props.mutate({
      mutation: FEEDBACK_MUTATION,
      variables: {title, content},
      update: (proxy, {data: {feedback}}) => {
        const data = proxy.readQuery(PROXY_DATA)

        data.latestFeedback.push(feedback)

        proxy.writeQuery({
          data,
          ...PROXY_DATA,
        })
      }
    }).then(() => {
      // After sendung data to server
      this.setState({sending: false})
    })
  }

  renderLastEntries() {
    const {data: {latestFeedback}} = this.props
    // Create new array due to fatal error when calling 'sort':
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Read-only
    const data = latestFeedback ? [...latestFeedback] : []

    // Sort by date, to make new written entries goes first
    return data
      .sort((prev, next) => prev.date < next.date)
      .map(({id, title, date, content, user}) => (
        <Item
          key={id}
          title={title}
          date={date}
          screenname={user.screenname}
          avatar={user.avatar}
        >
          {content}
        </Item>
    ))
  }

  render() {
    return (
      <Loader transparent active={this.props.data.loading}>

        {/* TODO: Wrap with validator */}
        <Form
          onSubmit={this.handleSubmit}
          sending={this.state.sending}
        />

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
  graphql(LATEST_FEEDBACK_QUERY, {
    options: {variables: {limit: LAST_ITEM_COUNT}}
  }),
  graphql(FEEDBACK_MUTATION)
)(FeedbackWithData)
