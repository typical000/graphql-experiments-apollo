import React from 'react'
import posed, {PoseGroup} from 'react-pose'
import PropTypes from 'prop-types'
import Row from '../ui/Row'
import Item from './Item'

const AnimatedRow = posed(Row)({
  enter: {y: 0, opacity: 1},
  exit: {y: 50, opacity: 0},
})

const SortedByDateList = ({items}) => {
  // Create new array due to fatal error when calling 'sort':
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Read-only
  const list = items ? [...items] : []

  // Sort by date, to make new written entries goes first
  return (
    <PoseGroup animateOnMount>
      {list
        .sort((prev, next) => prev.date < next.date)
        // "Row" components was added to take care about leaving
        // our components indipendent from their rendering context.
        .map(({id, title, date, content, user}) => (
          <AnimatedRow key={id}>
            <Item
              title={title}
              date={date}
              screenname={user.screenname}
              avatar={user.avatar}
            >
              {content}
            </Item>
          </AnimatedRow>
        ))}
    </PoseGroup>
  )
}

SortedByDateList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      date: PropTypes.number,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      user: PropTypes.object,
    }),
  ).isRequired,
}

export default SortedByDateList
