module.exports = {
  verbose: true,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '.*': 'babel-jest',
  },
  // Remove after react-apollo@2.1.0 stable goes to live
  // see: https://github.com/apollographql/react-apollo/issues/1633
  moduleNameMapper: {
    '^react-apollo$': '<rootDir>/node_modules/react-apollo/index.js'
  },
}
