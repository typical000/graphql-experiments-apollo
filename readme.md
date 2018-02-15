# Apollo GraphQL experiments

Created by Pavel Davydov

# HOWTO

```
npm run server
```
Starts server on `localhost:4001` and enabled online GraphQL editor on `http://localhost:4001/graphiql`

```
npm run start
```
Starts client dev-server on `localhost:4000`

# TODO

- [x] Configure environment
- [x] Setup apollo server
- [x] Create skeleton for future site
  - [x] Layout for logged in or guest user
  - [x] Header
  - [x] Search results with 'Load more'
  - [x] Feedback form with feedbacks
- [x] General GraphQL patterns
  - [x] Query batching
  - [x] Using fragments
  - [x] Using variables in GraphQL. Passing params
  - [x] Load more, pagination
  - [x] Mutations
  - [x] Use loader for *.graphql files (https://github.com/apollographql/graphql-tag#webpack-preprocessing-with-graphql-tagloader)
- [x] GraphQL on frontend (Apollo)
  - [x] Query on server
  - [x] Fragments usage
  - [x] Send mutations on server
  - [x] Directly change data in cache
  - [x] Optimistic updates
- [x] Routing
  - [x] Create 2 pages
- [x] Setup tests
  - [x] Jest
  - [x] Simple unit tests
  - [x] Snapshots
  - [x] Using enzyme and sinon as helper libs
