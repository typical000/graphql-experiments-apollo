import React from 'react'
import {render} from '../../../utils/testSuite'
import User from '../User'

describe('User', () => {
  it('Should render correctly', () => {
    // Call InnerComponent for making snapshot of real component
    // instead of JSS-wrapped one
    const user = render(
      <User.InnerComponent
        classes={{}}
        avatar={'someUrl.jpg'}
        screenname={'Username'}
        gender={1}
      />
    )

    expect(user).toMatchSnapshot()
  })
})
