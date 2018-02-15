import React from 'react'
import {spy} from 'sinon'
import {
  renderWithJss as render,
  mountWithJss as mount,
  extractFromJssWrapper,
} from '../../../utils/testSuite'
import Form from '../Form'

describe('FeedbackForm', () => {
  it('Should render correctly', () => {
    // Call InnerComponent for making snapshot of real component
    // instead of JSS-wrapped one
    const form = render(
      <Form.InnerComponent classes={{}} onSubmit={() => {}} />,
    )
    expect(form).toMatchSnapshot()
  })

  it('Should pass data via callback on submit click', () => {
    const onSubmit = spy()
    const form = mount(<Form onSubmit={onSubmit} />)

    form.find('Button').simulate('click')
    expect(onSubmit.called).toBeTruthy()
  })

  /**
   * Don't know why, but "form.setState"
   * doesn't update state in real world, and in onSubmit callback
   * arrives old data.
   */
  it('Should pass field values on submit', () => {
    let data = {}

    const form = mount(
      <Form
        onSubmit={(values) => {
          data = values
        }}
      />,
    )
    const button = form.find('.actions').children()

    button.simulate('click')
    expect(data).toEqual({
      title: '',
      content: '',
    })

    // Update state with new data
    extractFromJssWrapper(form)
      .instance()
      .setState({
        title: 'Title',
        content: 'Content',
      })

    button.simulate('click')

    expect(data).toEqual({
      title: 'Title',
      content: 'Content',
    })
  })
})
