const {find} = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')

const PORT = process.env.PORT

// Some fake data
const users = [
  {
    id: 100,
    avatar: 'http://bezkota.ru/wp-content/uploads/2016/03/dzhimo-kot-s-samymi-bolshimi-glazami-v-mire-08.jpg',
    screenname: 'SomeUser',
    gender: 1,
    geo: {
      city: 'New York',
      country: 'USA',
      lat: 0,
      lng: 0,
    }
  }, {
    id: 101,
    avatar: 'https://fthmb.tqn.com/WhmvoAF-QK7euBc1crnPYh9IlSM=/960x0/filters:no_upscale()/step_4-disease-59b9b6a9d963ac0011faca31-59bae508396e5a0010365c5b.jpg',
    screenname: 'SomeCoolUser',
    gender: 1,
    geo: {
      city: 'X3',
      country: 'X3',
      lat: 1,
      lng: 1,
    }
  }, {
    id: 102,
    avatar: 'https://fthmb.tqn.com/XnP6Ci8N-zeKop1cg8K3LzBqz-c=/960x0/filters:no_upscale()/step_3-lucky-59b9b688685fbe0011c6ac78-59bae4f0054ad90011988d89.jpg',
    screenname: 'OtherUser',
    gender: 2,
    geo: {
      city: 'Unknown',
      country: 'X3',
      lat: 1,
      lng: 1,
    }
  }, {
    id: 103,
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/A_black_cat_named_Tilly.jpg/220px-A_black_cat_named_Tilly.jpg',
    screenname: 'arghx',
    gender: 1,
    geo: {
      city: 'San Francisco',
      country: 'USA',
      lat: 20.5,
      lng: 10.1,
    }
  }, {
    id: 104,
    avatar: 'http://www.strangehistory.net/blog/wp-content/uploads/2011/05/black-cat.jpg',
    screenname: 'Username',
    gender: 2,
    geo: {
      city: 'Kiev',
      country: 'UKR',
      lat: 20.5,
      lng: 10.1,
    }
  }, {
    id: 105,
    avatar: 'http://www.lifewithcats.tv/wp-content/uploads/2015/11/Black-Cat-random-32500172-1280-1024.jpg',
    screenname: 'Upyachka',
    gender: 2,
    geo: {
      city: 'Kiev',
      country: 'UKR',
      lat: 20.5,
      lng: 10.1,
    }
  }, {
    id: 106,
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Black_cat_waiting.JPG',
    screenname: 'CoolUser',
    gender: 1,
    geo: {
      city: 'Rome',
      country: 'IT',
      lat: 20.5,
      lng: 10.1,
    }
  }, {
    id: 107,
    avatar: 'https://fthmb.tqn.com/6Qr0w5RLqvi-bnwBB8Te0v9WaZk=/960x0/filters:no_upscale()/step_5-black_cat_rust-59b9b6d8c41244001011de64-59bae52903f4020010ab49ac.jpg',
    screenname: 'UserTest',
    gender: 2,
    geo: {
      city: 'Berlin',
      country: 'DEU',
      lat: 20.5,
      lng: 10.1,
    }
  }
]

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

// The GraphQL schema in string form
const typeDefs = `
  type User {
    id: Int!
    avatar: String
    screenname: String
    gender: Int
    geo: Geo
    actions: [Actions!]!
  }

  type Geo {
    city: String
    country: String
    lat: Float
    lng: Float
  }

  type Actions {
    user: User!,
    like: Like!,
    favorite: Favorite!
  }

  type Like {
    available: Boolean!,
    active: Boolean!,
  }

  type Favorite {
    available: Boolean!,
    active: Boolean!,
  }

  type Query {
    users: [User]
    user(id: Int!): User
    geo(id: Int!): Geo
    actions: [Actions]
    likes: [Like]
  }
`

// The resolvers
const resolvers = {
  Query: {
    // Request just ALL users
    users: () => users,
    // Request single user by ID
    user: (obj, args, context, info) => find(users, {id: args.id}),
    // Get geolocation info for single user by ID
    geo: (obj, args) => find(users, {id: args.id}).geo,
  }
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// Initialize the app
const app = express()

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

// Start the server
app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`)
})
