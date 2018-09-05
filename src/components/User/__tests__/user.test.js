import React from 'react'
import {renderWithJss as render} from '../../../utils/testSuite'
import User from '../User'

describe('User', () => {
  it('Should render correctly', () => {
    // Call InnerComponent for making snapshot of real component
    // instead of JSS-wrapped one
    const user = render(
      <User
        id={'100'}
        avatar={'someUrl.jpg'}
        screenname={'Username'}
        gender={1}
      />,
    )

    expect(user).toMatchSnapshot()
  })
})
