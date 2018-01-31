const users = require('./users')

const action = {available: true, active: false}
const actionDisabled = {available: false, active: false}

const actions = [
  {
    user: users[0].id,
    like: action,
    favorite: action,
  }, {
    user: users[1].id,
    like: actionDisabled,
    favorite: action,
  }, {
    user: users[2].id,
    like: action,
    favorite: actionDisabled,
  }, {
    user: users[0].id,
    like: action,
    favorite: action,
  }, {
    user: users[1].id,
    like: actionDisabled,
    favorite: action,
  }, {
    user: users[2].id,
    like: action,
    favorite: actionDisabled,
  }, {
    user: users[0].id,
    like: action,
    favorite: action,
  }, {
    user: users[1].id,
    like: actionDisabled,
    favorite: action,
  }
]
