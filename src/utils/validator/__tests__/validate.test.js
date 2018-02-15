import validate from '../validate'
import RequiredValidator from '../RequiredValidator'
import StringValidator from '../StringValidator'

describe('Validate', () => {
  const errorMessage = 'ERROR'

  it('Should return original data on success validation', (done) => {
    const inputData = {
      foo: 'Foo',
      bar: 'Bar',
    }
    const rules = {
      foo: [new RequiredValidator({message: errorMessage})],
      bar: [
        new RequiredValidator({message: errorMessage}),
        new StringValidator({message: errorMessage, length: 3}),
      ],
    }

    validate(inputData, rules)
      .then((data) => {
        expect(data).toEqual(inputData)
        done()
      })
      .catch((error) => done.fail(error))
  })

  it('Should return errors in correct format', (done) => {
    const inputData = {
      foo: '',
      bar: '',
    }
    const rules = {
      foo: [new RequiredValidator({message: `${errorMessage}1`})],
      bar: [
        new RequiredValidator({message: `${errorMessage}2`}),
        new StringValidator({message: `${errorMessage}3`, length: 3}),
      ],
    }

    validate(inputData, rules)
      .then(() => done.fail())
      .catch((errors) => {
        expect(errors).toMatchSnapshot()
        done()
      })
  })

  it('Should avoid validation on fields with no rules specified on them', (done) => {
    const inputData = {
      foo: '',
      bar: 'Bar',
    }
    const rules = {
      foo: [new RequiredValidator({message: errorMessage})],
    }

    validate(inputData, rules)
      .then(() => done.fail())
      .catch((errors) => {
        expect(errors).toEqual({foo: [errorMessage]})
        done()
      })
  })
})
