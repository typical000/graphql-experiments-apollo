import React from 'react'
import FormValidator from '../FormValidator'
import {RequiredValidator} from '../../../utils/validator'
import {mount} from '../../../utils/testSuite'

const renderValidator = (value) =>
  mount(
    <FormValidator
      data={{foo: value}}
      rules={{
        foo: [new RequiredValidator({message: 'Foo should not be empty'})],
      }}
    >
      {({success, errors}) => {
        if (errors) return <div>Error</div>
        if (success) return <div>Success</div>
        return <div>Default behaviour</div>
      }}
    </FormValidator>,
  )

describe('FormValidator', () => {
  it('Should render correcty in case of successfull validation', (done) => {
    const wrap = renderValidator('foo')

    // Imitate props changing from outside
    wrap.instance().componentDidUpdate({})

    setTimeout(() => {
      wrap.update() // Force re-render after imitating props update
      expect(wrap).toMatchSnapshot()
      done()
    }, 5)
  })

  it('Should render correcty in case of error validation', (done) => {
    const wrap = renderValidator('')

    // Imitate props changing from outside
    wrap.instance().componentDidUpdate({})

    setTimeout(() => {
      wrap.update() // Force re-render after imitating props update
      expect(wrap).toMatchSnapshot()
      done()
    }, 5)
  })

  it("Should do nothing if props wasn't changed (do nothing on init)", () => {
    const wrap = renderValidator('foo')
    expect(wrap).toMatchSnapshot()
  })

  it('Should return success, error and data as callback params', () => {
    const inputData = {foo: 'bar'}
    const wrap = mount(
      <FormValidator data={inputData} rules={{}}>
        {({success, errors, data}) => (
          <div>
            {`Success: ${success}`}
            {`Errors: ${errors}`}
            {`Input data doesn't mutate: ${data === inputData}`}
          </div>
        )}
      </FormValidator>,
    )

    wrap.setState({
      success: 'foo',
      errors: 'bar',
    })

    wrap.update()
    expect(wrap).toMatchSnapshot()
  })
})
