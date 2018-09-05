const fs = require('fs')
const fetch = require('node-fetch')
const {find} = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')
const GraphQLDate = require('graphql-iso-date')

const appData = require('./__mocks__/appData')
const users = require('./__mocks__/users')
const actions = require('./__mocks__/actions')
const newsfeeds = require('./__mocks__/newsfeeds')

const PORT = process.env.PORT

// The GraphQL schema in string form
const typeDefs = `

  scalar Date

  type AppData {
    guest: Boolean!
    user: User
  }

  type User {
    id: ID!
    avatar: String
    screenname: String
    gender: Int
    geo: Geo
    actions: Actions
  }

  type OffsetUsers {
    users: [User]
    limitReached: Boolean!
  }

  type Geo {
    city: String
    country: String
    lat: Float
    lng: Float
  }

  type Actions {
    id: ID!
    like: Like!
    favorite: Favorite!
  }

  type Like {
    id: ID!
    available: Boolean!
    active: Boolean!
  }

  type Favorite {
    id: ID!
    available: Boolean!
    active: Boolean!
  }

  type Newsfeed {
    id: ID!
    user: User!
    date: Date!
    title: String
    content: String
  }

  type Query {
    appData: AppData
    users: [User]
    user(id: ID!): User
    geo(id: ID!): Geo
    offsetUsers(offset: Int!, limit: Int!): OffsetUsers
    actions(id: ID): Actions
    like(id: ID): Like
    favorite(id: ID): Favorite
    latestNewsfeed(limit: Int!): [Newsfeed]
  }

  type Mutation {
    logout: AppData
    like(id: ID!): Like
    favorite(id: ID!): Favorite
    newsfeed(title: String!, content: String!): Newsfeed
  }
`

/**
 * Resolvers. For more info see:
 * https://www.apollographql.com/docs/graphql-tools/resolvers.html#Resolver-function-signature
 */
const resolvers = {
  Date: GraphQLDate,

  Query: {
    // Main application data
    appData: () => appData,
    // Request just ALL users
    users: () => users,
    // Request users with offset and limit
    offsetUsers: (obj, {offset, limit}) => {
      const result = users.slice(offset, offset + limit)
      return {
        users: result,
        limitReached: result.length < limit,
      }
    },
    // Request single user by ID
    user: (obj, args, context, info) => find(users, {id: args.id}), // eslint-disable-line
    // Get geolocation info for single user by ID
    geo: (obj, args) => find(users, {id: args.id}).geo,
    // Actions
    like: (obj, {id}) => find(actions, {id: id}).like,
    favorite: (obj, {id}) => find(actions, {id: id}).favorite,

    // Retrive latest newsfeeds
    latestNewsfeed: (obj, {limit}) => {
      let result = newsfeeds.sort((a, b) => a.date < b.date).slice(0, limit)
      // Add user data to sorted newsfeeds
      result = result.map((item) => {
        item.user = find(users, {id: item.userId})
        return item
      })

      return result
    }
  },

  User: {
    actions: (obj) => find(actions, {id: obj.id})
  },

  Like: {
    id: (obj, args) => find(users, {id: obj.id}).id
  },

  Favorite: {
    id: (obj) => find(users, {id: obj.id}).id
  },

  Mutation: {
    // Just return logged-out data
    logout: () => ({
      guest: true,
      user: null
    }),

    like: (obj, args) => ({
      id: args.id,
      active: true,
      available: true,
    }),

    favorite: (obj, args) => ({
      id: args.id,
      active: true,
      available: true,
    }),

    newsfeed: (obj, args) => ({
      id: Math.round(Math.random() * 1000), // Just get random ID
      date: Date.now(),
      title: args.title,
      content: args.content,
      user: appData.user, // Retrive user data from server. In this case just use mocks
    })
  }
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
    /* eslint-disable */
    console.log('')
    console.log('> Performed request:')
    console.log(data)
    /* eslint-enable */
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

/**
 * Make some additional work to passing fragment types to client
 * for making fragment matching work fine
 *
 * https://www.apollographql.com/docs/react/recipes/fragment-matching.html
 */
fetch(`http://localhost:${PORT}/graphql`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter((type) => {
      return type.possibleTypes !== null
    })

    result.data.__schema.types = filteredData

    fs.writeFile('./src/fragmentTypes.json', JSON.stringify(result.data), err => {
      if (err) console.error('Error writing fragmentTypes file', err)
    })
  })
