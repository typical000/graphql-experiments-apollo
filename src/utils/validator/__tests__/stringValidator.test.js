import Validator from '../StringValidator'

describe('StringValidator', () => {
  const errorMessage = 'ERROR'

  it('Should throw error on non-string data', (done) => {
    const validator = new Validator({
      message: errorMessage,
    })

    validator
      .validate(100)
      .then(() => done.fail())
      .catch((error) => {
        expect(error).toEqual(errorMessage)
        done()
      })
  })

  it('Should throw error if provided string is shorter than needed', (done) => {
    const validator = new Validator({
      message: errorMessage,
      min: 5,
    })

    validator
      .validate('foo')
      .then(() => done.fail())
      .catch((error) => {
        expect(error).toEqual(errorMessage)
        done()
      })
  })

  it('Should throw error if provided string is longer than needed', (done) => {
    const validator = new Validator({
      message: errorMessage,
      max: 5,
    })

    validator
      .validate('foo-bar-baz')
      .then(() => done.fail())
      .catch((error) => {
        expect(error).toEqual(errorMessage)
        done()
      })
  })

  it('Should throw error if provided string have different length than needed', (done) => {
    const validator = new Validator({
      message: errorMessage,
      length: 5,
    })

    validator
      .validate('foo-bar-baz')
      .then(() => done.fail())
      .catch((error) => {
        expect(error).toEqual(errorMessage)
        done()
      })
  })

  it('Should pass with correct data', (done) => {
    const validator = new Validator({
      message: errorMessage,
      length: 3,
      min: 1,
      max: 5,
    })

    validator
      .validate('foo')
      .then(() => done())
      .catch(() => done.fail())
  })
})
