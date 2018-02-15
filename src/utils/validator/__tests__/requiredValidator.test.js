import Validator from '../RequiredValidator'

describe('RequiredValidator', () => {
  const errorMessage = 'ERROR'
  let validator

  beforeAll(() => {
    validator = new Validator({
      message: errorMessage
    })
  })

  it('Should throw error on empty data', (done) => {
    validator.validate('')
      .then(() => done.fail())
      .catch((error) => {
        expect(error).toEqual(errorMessage)
        done()
      })
  })

  it('Should pass when there is any data', (done) => {
    validator.validate('foo')
      .then(() => done())
      .catch(() => done.fail())
  })
})
