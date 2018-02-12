import React from 'react'
import {shallow} from '../../../utils/testSuite'
import User from '../User'

describe('User', () => {
  it('Should render correctly', () => {
    const userList = shallow(<User />)
    expect(userList).toMatchSnapshot()
  })

  // TODO: Write more tests
})
