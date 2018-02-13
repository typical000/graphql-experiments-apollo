import React from 'react'
import {shallow, render, mount} from '../../../utils/testSuite'
import UserList from '../UserList'

describe('UserList', () => {
  it('Should render correctly', () => {
    // Call InnerComponent for making snapshot of real component
    // instead of JSS-wrapped one
    const userList = render(
      <UserList.InnerComponent classes={{}} />
    )
    const userListWithLoadMore = render(
      <UserList.InnerComponent
        classes={{}}
        onLoadMoreClick={() => {}}
      />
    )

    expect(userList).toMatchSnapshot()
    expect(userListWithLoadMore).toMatchSnapshot()
  })

  it('Should render correct number of children', () => {
    const userList = shallow(
      <UserList>
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
      </UserList>
    )

    expect(userList.find('.item')).toHaveLength(3)
  })

  it('Should "Load more" button be visible', () => {
    const userListWithLimitReached = mount(<UserList limitReached />)
    const userListWithLoading = mount(
      <UserList
        limitReached={false}
        loading
        onLoadMoreClick={() => {}}
      />
    )
    const userListWithAllNeededProps = mount(
      <UserList
        limitReached={false}
        loading={false}
        onLoadMoreClick={() => {}}
      />
    )

    expect(userListWithLimitReached.find('.action').length).toBeFalsy()
    expect(userListWithLoading.find('.action').length).toBeFalsy()
    expect(userListWithAllNeededProps.find('.action').length).toEqual(1)
  })

  it('Should "Load more" click pass number of children', () => {
    let itemCount = 0

    const userList = mount(
      <UserList onLoadMoreClick={count => (itemCount = count)}>
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
      </UserList>
    )

    // Execute click to get number of items
    userList.find('.button').simulate('click')
    expect(itemCount).toBe(3)
  })
})
