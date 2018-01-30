import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

const QUERY = gql`
  query {
    users {
      id
      avatar
      gender
      geo {
        city
      }
    }
  }`;

// We then can use the graphql container to pass the query results returned by MY_QUERY
// to a component as a prop (and update them as the results change)
const UserListWithData = graphql(QUERY)((props) => {
  return (
    <div>
      {console.log('>>> PROPS')}
      {console.log(props.data.loading)}
      {console.log(props.data.users)}
    </div>
  )
});

export default UserListWithData