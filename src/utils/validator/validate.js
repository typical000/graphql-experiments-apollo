/**
 * @param {Object} data - object of fields that must be validated
 * @param {Object} rules
 *
 * Example of data:
 *
 * {
 *   foo: 'foo',
 *   bar: 'bar'
 * }
 *
 * Rules must be in such format, for e.g.:
 *
 * {
 *   foo: [
 *     new RequiredValidator({
 *       message: 'Foo should not be empty',
 *     })
 *   ],
 *   bar: [
 *     new RequiredValidator({
 *       message: 'Bar should not be empty',
 *     }),
 *     new StringValidator({
 *       message: `Bar must be at least 5 and not more than 100 characters`,
 *       min: 5,
 *       max: 100,
 *     })
 *   ]
 * }
 *
 * @returns {Promise}
 */
export default (data = {}, rules = {}) => new Promise((resolve, reject) => {
  const errors = {}
  const validators = []

  for (const field in rules) {
    rules[field].forEach((rule) => {
      // Add all rules to array for waiting for promise all (see below)
      validators.push(rule.validate(data[field])
        .catch((error) => {
          if (!errors[field]) {
            errors[field] = []
          }

          errors[field].push(error)
        })
      )
    })
  }

  Promise.all(validators).then(() => {
    // If errors have almost one key it mean that there are errors
    if (Object.keys(errors).length) {
      reject(errors, data)
    }

    resolve(data)
  })
})
