const {find} = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')

const appData = require('./__mocks__/appData')
const users = require('./__mocks__/users')
const actions = require('./__mocks__/actions') // eslint-disable-line

const PORT = process.env.PORT

// The GraphQL schema in string form
const typeDefs = `
  type AppData {
    guest: Boolean!
    user: User
  }

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
    appData: AppData
    users: [User]
    user(id: Int!): User
    geo(id: Int!): Geo
    actions: [Actions]
    likes: [Like]
    offsetUsers(offset: Int!, limit: Int!): [User]
  }
`

/**
 * Resolvers. For more info see:
 * https://www.apollographql.com/docs/graphql-tools/resolvers.html#Resolver-function-signature
 */
const resolvers = {
  Query: {
    // Main application data
    appData: () => appData,
    // Request just ALL users
    users: () => users,
    // Request users with offset and limit
    offsetUsers: (obj, {offset, limit}) => users.slice(offset, offset + limit),
    // Request single user by ID
    user: (obj, args, context, info) => find(users, {id: args.id}), // eslint-disable-line
    // Get geolocation info for single user by ID
    geo: (obj, args) => find(users, {id: args.id}).geo,
  },
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// Initialize the app
const app = express()

// Enable cors, to void make requests from 4000 port to 4001
app.use(cors())

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  debug: true,
  tracing: true,
  logFunction: ({action, step, key, data}) => {
    console.log('')
    console.log('> Performed request:')
    console.log(`action code: ${action}`)
    console.log(`step code: ${step}`)
    console.log(`action key: ${key}`)
    console.log(`data: ${data}`)
  }
}))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

// Start the server
app.listen(PORT, (error) => {
  if (error) {
    return error
  }

  // eslint-disable-next-line
  console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`)
  return null
})
