import React, {Children, PureComponent} from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'
import Loader from '../ui/Loader'
import {ButtonPrimary} from '../ui/Button'

const styles = {
  list: {
    textAlign: 'center',
    minHeight: 200,
  },
  action: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    display: 'inline-block',
    textAlign: 'left',
    verticalAlign: 'top',
    width: 385,
    margin: [0, 10, 20],
  },
}

class UserList extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    children: PropTypes.node,
    limitReached: PropTypes.bool,
    loading: PropTypes.bool,
    onLoadMoreClick: PropTypes.func,
  }

  static defaultProps = {
    children: null,
    limitReached: false,
    loading: false,
    onLoadMoreClick: null,
  }

  constructor(props) {
    super(props)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  get isLoadMoreAvailable() {
    return (
      !this.props.limitReached &&
      !this.props.loading &&
      this.props.onLoadMoreClick
    )
  }

  /**
   * Use as proxy method for passing updated count of rendered users
   */
  handleLoadMoreClick() {
    this.props.onLoadMoreClick(this.props.children.length)
  }

  render() {
    const {children, classes, loading} = this.props

    return (
      <Loader transparent active={loading}>
        <div className={classes.list}>
          {Children.map(children, (child) => (
            <div className={classes.item}>{child}</div>
          ))}
        </div>
        {this.isLoadMoreAvailable && (
          <div className={classes.action}>
            <ButtonPrimary onClick={this.handleLoadMoreClick}>
              Load more
            </ButtonPrimary>
          </div>
        )}
      </Loader>
    )
  }
}

export default injectSheet(styles)(UserList)
