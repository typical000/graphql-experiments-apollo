# GraphQL experiments

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
- [ ] Setup server
  - [x] Appollo support
  - [ ] Relay support
- [ ] Create skeleton for future site
  - [x] Layout for logged in or guest user
  - [x] Header
  - [x] Search results with 'Load more'
  - [ ] Search filters (form)
- [ ] General GraphQL patterns
  - [x] Query batching
  - [ ] Using fragments
  - [x] Using variables in GraphQL. Passing params
  - [x] Load more, pagination
  - [x] Mutations
  - [ ] Use loader for *.graphql files (https://github.com/apollographql/graphql-tag#webpack-preprocessing-with-graphql-tagloader)
- [ ] Apollo on frontend
  - [x] Query on server
  - [x] Fragments usage
  - [x] Send mutations on server
  - [x] Directly change data in cache
  - [ ] Optimistic updates
- [ ] Relay on frontend
  - [ ] Query on server
  - [ ] Fragments usage
  - [ ] Send mutations on server
  - [ ] Directly change data in cache
  - [ ] Optimistic updates
