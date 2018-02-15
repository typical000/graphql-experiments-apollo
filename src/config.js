module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  site: {
    head: {
      title: 'GraphQL Experiments',
      description: 'Experimenting with Relay and Apollo',
      keywords: ['graphql', 'relay', 'apollo', 'react'],
    },
    og: {
      title: 'GraphQL Experiments',
      description: 'Experimenting with Relay and Apollo',
      type: 'website',
      image: '',
      url: 'https://typical000.github.io/graphql-experiments/',
    },
  },
}
